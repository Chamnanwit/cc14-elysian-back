const {
  Property,
  User,
  PurchaseHistory,
  Optional,
  sequelize,
  Image,
} = require("../models");

const agencyService = require("../services/agencyService");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const createError = require("../utils/createError");
const uploadService = require("../services/uploadService");

exports.createProperty = async (req, res, next) => {
  try {
    const value = req.body;

    const property = await agencyService.createProperty(value);

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

exports.createPropertyAndOptional = async (req, res, next) => {
  const value = req.body;

  let transaction;
  try {
    transaction = await sequelize.transaction();
    const property = await Property.create(JSON.parse(value.property), {
      transaction,
    });

    const propertyId = property.id;

    const allOptionalType = JSON.parse(value.optional);

    const allOptionalTypeId = Object.keys(allOptionalType);

    for (let optionalTypeId of allOptionalTypeId) {
      const optional = await Optional.create(
        {
          propertyId: propertyId,
          optionalTypeId: optionalTypeId,
        },
        { transaction }
      );
    }

    if (req.files.length < 3) {
      createError("Image is must have at least three images");
    }

    const multiupload = async (files) => {
      console.log(files);
      const uploadMultiFiles = Promise.all(
        files.map(async (el) => {
          const result = await cloudinary.uploader.upload(el.path);
          return result.secure_url;
        })
      );

      return uploadMultiFiles;
    };

    console.log(req.files);

    await multiupload(req.files).then(async (uploadMultiFiles) => {
      const imgArr = uploadMultiFiles.map((el) => {
        const obj = { propertyId: propertyId, imageLink: el };

        return obj;
      });

      await Image.bulkCreate(imgArr, { transaction });
    });

    await transaction.commit();

    res.status(200).json({ message: "create success" });
  } catch (err) {
    console.log("error");
    if (transaction) {
      await transaction.rollback();
    }
    next(err);
  } finally {
    if (req.files) {
      for (let file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
  }
};

exports.getAllProperty = async (req, res, next) => {
  try {
    const result = await agencyService.getAllProperty();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getPropertyById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.uploadProperty = async (req, res, next) => {
  try {
    const multiupload = async (files) => {
      console.log(files);
      const uploadMultiFiles = [];
      for (let file of files) {
        const result = await cloudinary.uploader.upload(file.path);
        uploadMultiFiles.push(result.secure_url);
      }
      return uploadMultiFiles;
    };
    const { propertyId } = req.params;
    console.log(req.files);
    // console.log("---------------- -p-------------------------",propertyId)
    await multiupload(req.files).then(async (uploadMultiFiles) => {
      // console.log(uploadMultiFiles.length)
      const imgArr = uploadMultiFiles.map((el) => {
        const obj = { propertyId: propertyId, imageLink: el };
        // console.log("-------------*-*-*-*-*----------------------", imgArr[0])
        return obj;
      });
      // console.log("-------------*-*-*-*-*----------------------", imgArr)
      const rs = await agencyService.uploadMultiFiles(imgArr);
      res.json(rs);
    });
  } catch (err) {
    next(err);
  } finally {
    if (req.files) {
      for (let file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
  }
};

exports.uploadProfile = async (req, res, next) => {
  try {
    if (!req.file) {
      createError("profile image is required");
    }

    const updateValue = {};
    if (req.file) {
      const result = await uploadService.upload(req.file.path);
      updateValue.profileImage = result.secure_url;
    }

    await User.update(updateValue, { where: { id: req.user.id } });
    res.status(200).json(updateValue);
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.updateProfileAgency = async (req, res, next) => {
  try {
    const updateProfile = req.body;

    updateProfile.id = req.user.id;

    const updateValue = {};
    if (req.file) {
      const result = await uploadService.upload(req.file.path);
      updateProfile.profileImage = result.secure_url;
    }

    const result = await agencyService.updateProfileAgency(updateProfile);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};

exports.deleteImageProperty = async (req, res, next) => {
  try {
    const { propertyId } = req.params;
    // console.log(" OOOOOOOO ", propertyId);
    const deleteImageFileProperty = await agencyService.deleteImageProperty(
      propertyId
    );
    res.json(deleteImageFileProperty);
  } catch (err) {
    next(err);
  }
};

exports.deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.deleteProperty(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};

exports.updatePropertyById = async (req, res, next) => {
  try {
    const updateProperty = req.body;

    // updateProperty.id = req.user.id;
    // const updateValue = {};
    // if (req.file) {
    //   const result = await uploadService.upload(req.file.path);
    //   updateProfile.profileImage = result.secure_url;
    // }
    const result = await agencyService.updatePropertyById(updateProperty);

    res.status(200).json(updateProperty);
  } catch (err) {
    next;
  }
};

// exports.updateProperties = async (req, res, next) => {
//   try {
//     const updateProperty = req.body;

//     updateProperty.id = req.user.id;

//     const updateValue = {};
//     if (req.file) {
//       const result = await uploadService.upload(req.file.path);
//       updateProfile.profileImage = result.secure_url;
//     }

//     const result = await agencyService.updateProperties(updateProperty);

//     res.status(200).json({ message: "update success" });
//   } catch (err) {
//     next;
//   } finally {
//     if (req.file) {
//       fs.unlinkSync(req.file.path);
//     }
//   }
// };

exports.updatePropertyAndOptional = async (req, res, next) => {
  // const { propertyId } = req.params; // Assuming propertyId is passed as a parameter

  const updatedValue = req.body; // Assuming the updated data is sent in the request body

  let transaction;
  try {
    transaction = await sequelize.transaction();

    const propertyId = req.params.id;

    // Update the Property record
    if (updatedValue.property) {
      await Property.update(JSON.parse(updatedValue.property), {
        where: { id: propertyId }, // Assuming you have an 'id' field in the Property model
        transaction,
      });
    }

    // Delete all existing Optionals for the given Property
    await Optional.destroy({
      where: { propertyId },
      transaction,
    });

    // Insert new Optionals based on the updated data
    const allOptionalType = JSON.parse(updatedValue.optional);
    const allOptionalTypeId = Object.keys(allOptionalType);

    for (let optionalTypeId of allOptionalTypeId) {
      await Optional.create(
        {
          propertyId: propertyId,
          optionalTypeId: optionalTypeId,
        },
        { transaction }
      );
    }

    const multiupload = async (files) => {
      // console.log(files);
      const uploadMultiFiles = Promise.all(
        files.map(async (el) => {
          const result = await cloudinary.uploader.upload(el.path);
          return result.secure_url;
        })
      );

      return uploadMultiFiles;
    };

    console.log(req.files, "testtt");

    const uploadMultiFiles = await multiupload(req.files);
    const imageId = req.body.imageId;
    for (let i = 0; i < uploadMultiFiles.length; i++) {
      if (imageId[i]) {
        await Image.update(
          { imageLink: uploadMultiFiles[i] },
          { where: { id: imageId[i] } }
        );
      } else {
        await Image.create({ imageLink: uploadMultiFiles[i], propertyId });
      }
    }

    await transaction.commit();

    res.status(200).json({
      message: "update success",
      uploadMultiFiles,
      images: req.body.imageId,
    });
  } catch (err) {
    console.log(err);
    if (transaction) {
      await transaction.rollback();
    }
    next(err);
  } finally {
    if (req.files) {
      for (let file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
  }
};

exports.getAllImagePropertyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getAllImagePropertyById(id);

    const rs = { result: result.allImagePropertyById };

    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.getAllAgency = async (req, res, next) => {
  try {
    const result = await agencyService.getAllAgency();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAgencyById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getAgencyById(id);

    const totalPropertyById = await agencyService.getTotalPropertyById(id);

    const totalInactiveProperty = await agencyService.getTotalInactiveProperty(
      id
    );

    const totalActiveProperty = await agencyService.getTotalActiveProperty(id);

    const totalPurchase = await agencyService.getTotalPurchase(id);

    const result2 = {
      result,
      totalPropertyById: JSON.parse(
        JSON.stringify(totalPropertyById.totalPropertyById[0])
      ).count,
      totalInactiveProperty: JSON.parse(
        JSON.stringify(totalInactiveProperty.totalInactiveProperty[0])
      ).count,
      totalActiveProperty: JSON.parse(
        JSON.stringify(totalActiveProperty.totalActiveProperty[0])
      ).count,
      totalPurchase: JSON.parse(JSON.stringify(totalPurchase.totalPurchase[0]))
        .sum,
    };

    res.status(200).json(result2);
  } catch (err) {
    next(err);
  }
};

exports.getAllFromAgency = async (req, res, next) => {
  try {
    const result = await agencyService.getAllFromAgency();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteProfileAgency = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.deleteProfileAgency(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyByAgencyId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getPropertyByAgencyId(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getPurchaseHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getPurchaseHistoryById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllSubDistrict = async (req, res, next) => {
  try {
    const result = await agencyService.getAllSubDistrict();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllProvince = async (req, res, next) => {
  try {
    const result = await agencyService.getAllProvince();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
