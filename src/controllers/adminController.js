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

exports.deletePricingPlan = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.deletePricingPlan(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json({ message: "delete success" });
  } catch (err) {
    next(err);
  }
};

exports.updatePricingPlan = async (req, res, next) => {
  try {
    const updatePackage = req.body;
    // const id = req.params.id;

    const result = await adminService.updatePricingPlan(updatePackage);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  }
};

exports.createOptionalType = async (req, res, next) => {
  try {
    const value = req.body;

    const optionalType = await adminService.createOptionalType(value);

    res.status(201).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getAllOptionalType = async (req, res, next) => {
  try {
    const result = await adminService.getAllOptionalType();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOptionalTypeById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.getOptionalTypeById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteOptionalType = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.deleteOptionalType(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateOptionalType = async (req, res, next) => {
  try {
    const updateOptionalType = req.body;
    const id = req.params.id;

    const result = await adminService.updateOptionalType(
      updateOptionalType,
      id
    );

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  }
};

exports.createOptional = async (req, res, next) => {
  try {
    const value = req.body;

    const optional = await adminService.createOptional(value);

    res.status(201).json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};

exports.getAllOptional = async (req, res, next) => {
  try {
    const result = await adminService.getAllOptional();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getOptionalById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.getOptionalById(id);

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteOptional = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.deleteOptional(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.updateOptional = async (req, res, next) => {
  try {
    const updateOptional = req.body;
    const id = req.params.id;

    const result = await adminService.updateOptional(updateOptional, id);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  }
};

exports.updateProfileAdmin = async (req, res, next) => {
  try {
    const updateProfile = req.body;

    const result = await adminService.updateProfileAdmin(updateProfile);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  }
};

exports.updateAdminForm = async (req, res, next) => {
  try {
    const updateForm = req.body;

    const result = await adminService.updateAdminForm(updateForm);

    res.status(200).json({ message: "update success" });
  } catch (err) {
    next;
  }
};

exports.deleteAdminForm = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await adminService.deleteAdminForm(id);

    if (result === 0) {
      throw new Error("Cannot Delete!!");
    }

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
