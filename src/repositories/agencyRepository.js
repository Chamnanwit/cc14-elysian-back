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

exports.updateProperties = (updateProperty) => {
  return Property.update(updateProperty, {
    where: {
      id: updateProperty.id,
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
    order: [["locked"]],
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

exports.deleteProfileAgency = (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};

exports.getPropertyByAgencyId = (id) => {
  return User.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: Property,
        include: [
          {
            model: SubDistrict,
            include: {
              model: District,
              include: {
                model: Province,
              },
            },
          },
        ],
      },
      {
        model: Property,
        include: [
          {
            model: Optional,
            include: OptionalType,
          },
          {
            model: RoomType,
          },
        ],
      },
    ],
  });
};

exports.getPurchaseHistoryById = (id) => {
  return PurchaseHistory.findOne({
    where: {
      id: id,
    },
    include: [
      {
        model: PricingPlan,
      },
      {
        model: User,
      },
    ],
  });
};

exports.getAllSubDistrict = () => {
  return SubDistrict.findAll({
    include: [
      {
        model: District,
        include: [
          {
            model: Province,
          },
        ],
      },
    ],
  });
};
