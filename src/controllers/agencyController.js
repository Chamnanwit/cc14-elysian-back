const { Property, PurchaseHistory } = require("../models");

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
    const {  propertyId } = req.params;
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
    if(req.files) {
      for (let file of req.files) {
        fs.unlinkSync(file.path);
      }
    }
  }
}

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

exports.updateProfileAgency = async (req, res, next) => {
  try {
    const updateProfile = req.body;
    // const id = req.params.id;

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

    res.status(200).json(result);
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
