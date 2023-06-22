const { Property } = require("../models");

exports.createProperty = async (req, res, next) => {
  try {
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
    });

    res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
};

exports.getPropertyList = async () => {
  try {
    const { id } = req.params;

    Property.findOne({
      attributes: [
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
      ],
      where: { id: id },
    });

    res.status(200).json(rs);
  } catch (err) {
    next(err);
  }
};

exports.getAgencyProfile = async () => {
  try {
  } catch (err) {
    next(err);
  }
};
