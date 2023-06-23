const { PricingPlan } = require("../models");

const adminService = require("../services/adminService");

exports.createPricingPlan = async (req, res, next) => {
  try {
    const value = req.body;

    const package = await adminService.createPackage(value);

    res.status(201).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getPricingPlanById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.getPackageById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getAllPricingPlan = async (req, res, next) => {
  try {
    const result = await adminService.getAllPricingPlan();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
