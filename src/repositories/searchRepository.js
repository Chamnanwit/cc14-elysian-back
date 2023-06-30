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

exports.getRoomType = () => RoomType.findAll();

exports.getProvince = () => Province.findAll();

exports.getHomeSearch = (location) => {
  return Province.findAll({
    where: {
      code: location.code,
    },
    include: [
      {
        model: District,
        include: {
          model: SubDistrict,
        },
      },
      {
        model: RoomType,
      },
    ],
  });
};
