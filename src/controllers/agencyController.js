const { Property } = require("../models");

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
