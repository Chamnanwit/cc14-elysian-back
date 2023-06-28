const {
  User,
  Property,
  SubDistrict,
  District,
  Province,
  Optional,
  OptionalType,
  PurchaseHistory,
} = require("../models");

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

exports.getReportAgency = () => {
  return PurchaseHistory.findAll({});
};
