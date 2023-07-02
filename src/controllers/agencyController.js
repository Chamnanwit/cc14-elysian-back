const { Property,User, PurchaseHistory, Optional, sequelize } = require("../models");

const agencyService = require("../services/agencyService");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

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
    const property = await Property.create(
      {
        name: value.name,
        price: value.price,
        floor: value.floor,
        totalArea: value.totalArea,
        totalUnit: value.totalUnit,
        totalBedroom: value.totalBedroom,
        totalBathroom: value.totalBathroom,
        totalKitchen: value.totalKitchen,
        description: value.description,
        latitude: value.latitude,
        longitude: value.longitude,
        rentPeriod: value.rentPeriod,
        locked: value.locked,
        published: value.published,
        topStatus: value.topStatus,
        userId: value.userId,
        roomTypeId: value.roomTypeId,
        subDistrictId: value.subDistrictId,
      },
      { transaction }
    );

    const optional = await Optional.create(
      {
        propertyId: value.propertyId,
        optionalTypeId: value.optionalTypeId,
      },
      { transaction }
    );
    await transaction.commit();

    res.status(200).json({ property, optional });
  } catch (err) {
    {
      console.log("error");
      if (transaction) {
        await transaction.rollback();
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
      if (!req.files.profileImage) {
        createError('profile image is required');
      }
  
      const updateValue = {};
      if (req.files.profileImage) {
        const result = await uploadService.upload(req.files.profileImage[0].path);
        updateValue.profileImage = result.secure_url;
      }
      
      await User.update(updateValue, { where: { id: req.user.id } });
      res.status(200).json(updateValue);
    } catch (err) {
      next(err);
    } finally {
      if (req.files.profileImage) {
        fs.unlinkSync(req.files.profileImage[0].path);
      }
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

exports.updateProperties = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.updateProperties(id);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
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

exports.updateProfileAgency = async (req, res, next) => {
  try {
    const updateProfile = req.body;

    const result = await agencyService.updateProfileAgency(updateProfile);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
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
