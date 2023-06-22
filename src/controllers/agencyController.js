const { Property } = require("../models");

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
      userId,
      roomTypeId,
      subDistrictId,
    } = req.body;

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
      userId: userId,
      roomTypeId: roomTypeId,
      subDistrictId: subDistrictId,
    });

    res.status(201).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyList = async (req, res, next) => {
  try {
    const { id } = req.params;
    // console.log(req);
    const PropertyList = await Property.findAll({
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

// exports.getAgencyProfile = async () => {
//   try {
//   } catch (err) {
//     next(err);
//   }
// };
