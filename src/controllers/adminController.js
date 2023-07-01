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

    const result = await adminService.updateOptionalType(updateOptionalType);

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
    v;

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
    console.log(req.body);

    const result = await adminService.updateOptional(updateOptional);

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

exports.getAllAdmin = async (req, res, next) => {
  try {
    const result = await adminService.getAllAdmin();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getReport = async (req, res, next) => {
  try {
    const {
      dailyPurchaseResult,
      monthlyPurchaseResult,
      yearlyPurchaseResult,
      totalPurchase,
    } = await adminService.getPurchase();

    const {
      dailyNewUserResult,
      monthlyNewUserResult,
      yearlyNewUserResult,
      totalNewUser,
    } = await adminService.getNewUser();

    const {
      activePropertyResult,
      inactivePropertyResult,
      totalPropertyResult,
    } = await adminService.getProperty();

    const { agencyResult } = await adminService.getAgencyResult();

    const {
      dailyEarningResult,
      monthlyEarningResult,
      yearlyEarningResult,
      totalEarning,
    } = await adminService.getEarning();

    const report = {
      dailyPurchaseResult: JSON.parse(JSON.stringify(dailyPurchaseResult[0]))
        .count,
      monthlyPurchaseResult: JSON.parse(
        JSON.stringify(monthlyPurchaseResult[0])
      ).count,
      yearlyPurchaseResult: JSON.parse(JSON.stringify(yearlyPurchaseResult[0]))
        .count,
      totalPurchase: JSON.parse(JSON.stringify(totalPurchase[0])).count,
      dailyNewUserResult: JSON.parse(JSON.stringify(dailyNewUserResult[0]))
        .count,
      monthlyNewUserResult: JSON.parse(JSON.stringify(monthlyNewUserResult[0]))
        .count,
      yearlyNewUserResult: JSON.parse(JSON.stringify(yearlyNewUserResult[0]))
        .count,
      totalNewUser: JSON.parse(JSON.stringify(totalNewUser[0])).count,
      activePropertyResult: JSON.parse(JSON.stringify(activePropertyResult[0]))
        .count,
      inactivePropertyResult: JSON.parse(
        JSON.stringify(inactivePropertyResult[0])
      ).count,
      totalPropertyResult: JSON.parse(JSON.stringify(totalPropertyResult[0]))
        .count,
      agencyResult: JSON.parse(JSON.stringify(agencyResult[0])).count,
      dailyEarningResult: JSON.parse(JSON.stringify(dailyEarningResult[0])).sum,
      monthlyEarningResult: JSON.parse(JSON.stringify(monthlyEarningResult[0]))
        .sum,
      yearlyEarningResult: JSON.parse(JSON.stringify(yearlyEarningResult[0]))
        .sum,
      totalEarning: JSON.parse(JSON.stringify(totalEarning[0])).sum,
    };

    res.status(200).json(report);
  } catch (err) {
    next(err);
  }
};

exports.getAllPurchaseHistory = async (req, res, next) => {
  try {
    const result = await adminService.getAllPurchaseHistory();

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.getReportAgentDetailById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const totalPropertyById = await adminService.getTotalPropertyById(id);

    const totalInactiveProperty = await adminService.getTotalInactiveProperty(
      id
    );

    const totalActiveProperty = await adminService.getTotalActiveProperty(id);

    const totalPurchase = await adminService.getTotalPurchase(id);

    const result2 = {
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

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
