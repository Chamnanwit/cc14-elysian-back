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
const { sequelize, Sequelize, fn, Op, literal, col } = require("sequelize");

exports.createProperty = (property) => Property.create(property);

exports.getAllProperty = () => {
  return Property.findAll({
    include: [
      {
        model: SubDistrict,
        include: [
          {
            model: District,
            include: {
              model: Province,
            },
          },
        ],
      },
      {
        model: User,
      },
      {
        model: Optional,
        include: OptionalType,
      },
      {
        model: RoomType,
      },
    ],
  });
};

exports.getPropertyById = (id) => {
  return Property.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: SubDistrict,
        include: [
          {
            model: District,
            include: {
              model: Province,
            },
          },
        ],
      },
      {
        model: User,
      },
      {
        model: Optional,
        include: OptionalType,
      },
      {
        model: RoomType,
      },
    ],
  });
};

exports.deleteProperty = (id) => {
  return Property.destroy({
    where: {
      id: id,
    },
  });
};

exports.updateProfileAgency = (updateProfile) => {
  return User.update(updateProfile, {
    where: {
      id: updateProfile.id,
    },
  });
};

exports.getAllAgency = () =>
  User.findAll({
    where: {
      role: "AGENCY",
    },
    order: [["locked", "DESC"]],
  });

exports.getAllFromAgency = () =>
  User.findAll({
    where: {
      role: "AGENCY",
    },
  });

exports.getAgencyById = (id) => {
  return User.findOne({
    where: {
      id: id,
    },
  });
};

exports.deleteProfileAgency = (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};

// exports.getNewUser = async () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();
//   const date = now.getDate();

//   const startTime = new Date(year, month, date);
//   const endTime = new Date(year, month, date, 23, 59, 59);

//   const startTimeMonth = new Date(year, month, 1);
//   const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

//   const startTimeYear = new Date(year, 1, 1);
//   const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

//   const yearlyNewUserResult = await User.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
//       role: "AGENCY",
//     },
//     paranoid: false,
//     attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
//   });

//   const monthlyNewUserResult = await User.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
//       role: "AGENCY",
//     },
//     paranoid: false,
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   const dailyNewUserResult = await User.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTime, endTime] },
//       role: "AGENCY",
//     },
//     paranoid: false,
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   const totalNewUser = await User.findAll({
//     where: {
//       role: "AGENCY",
//     },
//     paranoid: false,
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   return {
//     dailyNewUserResult,
//     monthlyNewUserResult,
//     yearlyNewUserResult,
//     totalNewUser,
//   };
// };

// exports.getPurchase = async () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();
//   const date = now.getDate();

//   const startTime = new Date(year, month, date);
//   const endTime = new Date(year, month, date, 23, 59, 59);

//   const startTimeMonth = new Date(year, month, 1);
//   const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

//   const startTimeYear = new Date(year, 1, 1);
//   const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

//   const yearlyPurchaseResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
//   });

//   const monthlyPurchaseResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   const dailyPurchaseResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTime, endTime] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   const totalPurchase = await PurchaseHistory.findAll({
//     where: {
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   return {
//     dailyPurchaseResult,
//     monthlyPurchaseResult,
//     yearlyPurchaseResult,
//     totalPurchase,
//   };
// };

// exports.getProperty = async () => {
//   const activePropertyResult = await Property.findAll({
//     where: {
//       published: 1,
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]], // literal คือการระบุไปที่คอลัมในฐานข้อมูลโดยตรง ในกรณีที่สามมารถระบุชื่อในโมเดลได้
//   });

//   const inactivePropertyResult = await Property.findAll({
//     where: {
//       published: 0,
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   const totalPropertyResult = await Property.findAll({
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });

//   return { activePropertyResult, inactivePropertyResult, totalPropertyResult };
// };

// exports.getAgencyResult = async () => {
//   const agencyResult = await User.findAll({
//     where: {
//       role: "AGENCY",
//     },
//     attributes: [[fn("COUNT", literal("*")), "count"]],
//   });
//   return { agencyResult };
// };

// exports.getEarning = async () => {
//   const now = new Date();
//   const year = now.getFullYear();
//   const month = now.getMonth();
//   const date = now.getDate();

//   const startTime = new Date(year, month, date);
//   const endTime = new Date(year, month, date, 23, 59, 59);

//   const startTimeMonth = new Date(year, month, 1);
//   const endTimeMonth = new Date(year, month + 1, 0, 23, 59, 59);

//   const startTimeYear = new Date(year, 1, 1);
//   const endTimeYear = new Date(year, 12, 31, 23, 59, 59);

//   const dailyEarningResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTime, endTime] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [
//       [fn("SUM", col("PricingPlan.price")), "totaldailyEarningValue"],
//     ],
//     include: {
//       model: PricingPlan,
//       attributes: [],
//     },
//   });

//   const monthlyEarningResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeMonth, endTimeMonth] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [
//       [fn("SUM", col("PricingPlan.price")), "totalmonthlyEarningValue"],
//     ],
//     include: {
//       model: PricingPlan,
//       attributes: [],
//     },
//   });

//   const yearlyEarningResult = await PurchaseHistory.findAll({
//     where: {
//       createdAt: { [Op.between]: [startTimeYear, endTimeYear] },
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [
//       [fn("SUM", col("PricingPlan.price")), "totalyearlyEarningValue"],
//     ],
//     include: {
//       model: PricingPlan,
//       attributes: [],
//     },
//   });

//   const totalEarning = await PurchaseHistory.findAll({
//     where: {
//       paymentStatus: "SUCCESS",
//     },
//     attributes: [[fn("SUM", col("PricingPlan.price")), "totalEarningValue"]],
//     include: {
//       model: PricingPlan,
//       attributes: [],
//     },
//   });

//   return {
//     dailyEarningResult,
//     monthlyEarningResult,
//     yearlyEarningResult,
//     totalEarning,
//   };
// };
