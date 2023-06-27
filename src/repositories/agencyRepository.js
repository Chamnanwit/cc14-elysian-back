const {
  User,
  Property,
  SubDistrict,
  District,
  Province,
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
  });

exports.getAllFromAgency = () =>
  User.findAll({
    where: {
      role: "AGENCY",
    },
  });

exports.deleteProfileAgency = (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};
