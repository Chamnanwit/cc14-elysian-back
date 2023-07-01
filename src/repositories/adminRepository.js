const {
  User,
  Property,
  SubDistrict,
  District,
  Province,
  Optional,
  OptionalType,
  PurchaseHistory,
  PricingPlan,
  RoomType,
} = require("../models");

const {
  sequelize,
  Sequelize,
  fn,
  Op,
  literal,
  col,
  where,
} = require("sequelize");

exports.createPackage = (package) => PricingPlan.create(package);

exports.getPackageById = (id) => PricingPlan.findByPk(id);

exports.getPackageById = (id) => {
  return PricingPlan.findOne({
    where: {
      id: id,
    },
  });
};

exports.getAllPricingPlan = () => PricingPlan.findAll();

exports.deletePricingPlan = (id) => {
  return PricingPlan.destroy({
    where: {
      id: id,
    },
  });
};

exports.updatePricingPlan = (updatePackage) => {
  return PricingPlan.update(updatePackage, {
    where: {
      id: updatePackage.id,
    },
  });
};

exports.createOptionalType = (optionalType) =>
  OptionalType.create(optionalType);

exports.getAllOptionalType = () => OptionalType.findAll();

exports.getOptionalTypeById = (id) => {
  return OptionalType.findOne({
    where: {
      id: id,
    },
  });
};

exports.deleteOptionalType = (id) => {
  return OptionalType.destroy({
    where: {
      id: id,
    },
  });
};

exports.updateOptionalType = (updateOptionalType) => {
  return OptionalType.update(updateOptionalType, {
    where: {
      id: updateOptionalType.id,
    },
  });
};

exports.createOptional = (optional) => Optional.create(optional);

exports.getAllOptional = () => Optional.findAll();

exports.getOptionalById = (id) => {
  return Optional.findOne({
    where: {
      id: id,
    },
  });
};

exports.deleteOptional = (id) => {
  return Optional.destroy({
    where: {
      id: id,
    },
  });
};

exports.updateOptional = (updateOptional) => {
  return Optional.update(updateOptional, {
    where: {
      id: updateOptional.id,
    },
  });
};

exports.updateProfileAdmin = (updateProfile) => {
  return User.update(updateProfile, {
    where: {
      id: updateProfile.id,
    },
  });
};

exports.updateAdminForm = (updateForm) => {
  return User.update(updateForm, {
    where: {
      id: updateForm.id,
    },
  });
};

exports.deleteAdminForm = (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};

exports.getAllAdmin = () =>
  User.findAll({
    where: {
      role: "ADMIN",
    },
    order: [["locked"]],
  });

exports.getNewUser = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const startTime = new Date(year, month, date);
  const endTime = new Date(year, month, date, 23, 59, 59);

  const startTimeMonth = new Date(year, month, 1);
  const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const startTimeYear = new Date(year, 1, 1);
  const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

  const yearlyNewUserResult = await User.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
      role: "AGENCY",
    },
    paranoid: false,
    attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
  });

  const monthlyNewUserResult = await User.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
      role: "AGENCY",
    },
    paranoid: false,
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  const dailyNewUserResult = await User.findAll({
    where: {
      createdAt: { [Op.between]: [startTime, endTime] },
      role: "AGENCY",
    },
    paranoid: false,
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  const totalNewUser = await User.findAll({
    where: {
      role: "AGENCY",
    },
    paranoid: false,
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  return {
    dailyNewUserResult,
    monthlyNewUserResult,
    yearlyNewUserResult,
    totalNewUser,
  };
};

exports.getPurchase = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const startTime = new Date(year, month, date);
  const endTime = new Date(year, month, date, 23, 59, 59);

  const startTimeMonth = new Date(year, month, 1);
  const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const startTimeYear = new Date(year, 1, 1);
  const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

  const yearlyPurchaseResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
      paymentStatus: "complete",
    },
    attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
  });

  const monthlyPurchaseResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
      paymentStatus: "complete",
    },
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  const dailyPurchaseResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTime, endTime] },
      paymentStatus: "complete",
    },
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  const totalPurchase = await PurchaseHistory.findAll({
    where: {
      paymentStatus: "complete",
    },
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  return {
    dailyPurchaseResult,
    monthlyPurchaseResult,
    yearlyPurchaseResult,
    totalPurchase,
  };
};

exports.getProperty = async () => {
  const activePropertyResult = await Property.findAll({
    where: {
      published: 1,
    },
    attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
  });

  const inactivePropertyResult = await Property.findAll({
    where: {
      published: 0,
    },
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  const totalPropertyResult = await Property.findAll({
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });

  return { activePropertyResult, inactivePropertyResult, totalPropertyResult };
};

exports.getAgencyResult = async () => {
  const agencyResult = await User.findAll({
    where: {
      role: "AGENCY",
    },
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });
  return { agencyResult };
};

exports.getEarning = async () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const date = now.getDate();

  const startTime = new Date(year, month, date);
  const endTime = new Date(year, month, date, 23, 59, 59);

  const startTimeMonth = new Date(year, month, 1);
  const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

  const startTimeYear = new Date(year, 1, 1);
  const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

  const dailyEarningResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTime, endTime] },
      paymentStatus: "complete",
    },
    attributes: [[fn("SUM", col("PricingPlan.price")), "sum"]],
    include: {
      model: PricingPlan,
      attributes: [],
    },
  });

  const monthlyEarningResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
      paymentStatus: "complete",
    },
    attributes: [[fn("SUM", col("PricingPlan.price")), "sum"]],
    include: {
      model: PricingPlan,
      attributes: [],
    },
  });

  const yearlyEarningResult = await PurchaseHistory.findAll({
    where: {
      createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
      paymentStatus: "complete",
    },
    attributes: [[fn("SUM", col("PricingPlan.price")), "sum"]],
    include: {
      model: PricingPlan,
      attributes: [],
    },
  });

  const totalEarning = await PurchaseHistory.findAll({
    where: {
      paymentStatus: "complete",
    },
    attributes: [[fn("SUM", col("PricingPlan.price")), "sum"]],
    include: {
      model: PricingPlan,
      attributes: [],
    },
  });

  return {
    dailyEarningResult,
    monthlyEarningResult,
    yearlyEarningResult,
    totalEarning,
  };
};

exports.getAllPurchaseHistory = () =>
  PurchaseHistory.findAll({
    include: [
      {
        model: PricingPlan,
      },
      {
        model: User,
      },
    ],
  });

exports.getTotalPropertyById = async (id) => {
  const totalPropertyById = await Property.findAll({
    include: [
      {
        model: User,
        attributes: ["id"],
        where: {
          id: id,
        },
      },
    ],
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });
  return { totalPropertyById };
};

exports.getTotalInactiveProperty = async (id) => {
  const totalInactiveProperty = await Property.findAll({
    where: {
      locked: "FALSE",
    },
    include: [
      {
        model: User,
        attributes: ["id"],
        where: {
          id: id,
        },
      },
    ],
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });
  return { totalInactiveProperty };
};

exports.getTotalActiveProperty = async (id) => {
  const totalActiveProperty = await Property.findAll({
    where: {
      locked: "TRUE",
    },
    include: [
      {
        model: User,
        attributes: ["id"],
        where: {
          id: id,
        },
      },
    ],
    attributes: [[fn("COUNT", literal("*")), "count"]],
  });
  return { totalActiveProperty };
};

exports.getTotalPurchase = async (id) => {
  const totalPurchase = await PurchaseHistory.findAll({
    where: {
      paymentStatus: "complete",
    },
    include: [
      {
        model: User,
        attributes: ["id"],
        where: {
          id: id,
        },
      },
      {
        model: PricingPlan,
        attributes: ["id"],
      },
    ],
    attributes: [[fn("SUM", col("PricingPlan.price")), "sum"]],
  });
  return { totalPurchase };
};
