const { Property } = require("../models");
const agencyService = require("../services/agencyService");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");

exports.createProperty = async (req, res, next) => {
  try {
    // console.log(req.body);
    const {
      name,
      price,
      floor,
      totalArea,
      totalUnit,
      totalBedroom,
      totalBathroom,
      totalKitchen,
      description,
      latitude,
      longitude,
      rentPeriod,
      locked,
      published,
      topStatus,
      userId,
      roomTypeId,
      subDistrictId,
    } = req.body;

    // console.log(req.body);

    const property = await Property.create({
      name: name,
      price: price,
      floor: floor,
      totalArea: totalArea,
      totalUnit: totalUnit,
      totalBedroom: totalBedroom,
      totalBathroom: totalBathroom,
      totalKitchen: totalKitchen,
      description: description,
      latitude: latitude,
      longitude: longitude,
      rentPeriod: rentPeriod,
      locked: locked,
      published: published,
      topStatus: topStatus,
      userId: userId,
      roomTypeId: roomTypeId,
      subDistrictId: subDistrictId,
    });

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

exports.getAllPropertyList = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // console.log(req);
    const PropertyList = await Property.findAll({
      attributes: [
        "id",
        "name",
        "price",
        "floor",
        "totalArea",
        "totalUnit",
        "totalBedroom",
        "totalBathroom",
        "totalKitchen",
        "description",
        "latitude",
        "longitude",
        "rentPeriod",
        "locked",
        "published",
        "userId",
        "roomTypeId",
        "subDistrictId",
      ],
      // where: { id: id },
    });

    res.status(200).json(PropertyList);
  } catch (err) {
    next(err);
  }
};

exports.getPropertyList = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req);
    const PropertyList = await Property.findOne({
      attributes: [
        "name",
        "price",
        "floor",
        "totalArea",
        "totalUnit",
        "totalBedroom",
        "totalBathroom",
        "totalKitchen",
        "description",
        "latitude",
        "longitude",
        "rentPeriod",
        "locked",
        "published",
        "userId",
        "roomTypeId",
        "subDistrictId",
      ],
      where: { id: id },
    });

    res.status(200).json(PropertyList);
  } catch (err) {
    next(err);
  }
};

// exports.updateContent = (req, res, next) => {
//   const { id } = req.params;
//   const {
//     title,
//     supTitle,
//     image,
//     ingredients,
//     directions,
//     cardId,
//     userId,
//     typefoodId,
//   } = req.body;
//   Content.update(
//     { ...req.body, userId: req.user.id },
//     {
//       where: { id: id },
//     }
//   )
//     .then((rs) => {
//       res.status(200).json(rs);
//     })
//     .catch(next);
// };

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
    await multiupload(req.files).then(async (uploadMultiFiles) => {
      const imgArr = uploadMultiFiles.map((el) => {
        const obj = { propertyId: propertyId, imageLink: el };
        return obj;
      });
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
};
