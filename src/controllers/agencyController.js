const { Property, PurchaseHistory, Optional, sequelize } = require("../models");

const agencyService = require("../services/agencyService");

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

exports.getPurchaseHistoryById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await agencyService.getPurchaseHistoryById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
