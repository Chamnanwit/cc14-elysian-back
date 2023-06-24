const {
  User,
  Property,
  SubDistrict,
  District,
  Province,
} = require("../models");

exports.createProperty = (property) => Property.create(property);

exports.getAllProperty = () => Property.findAll();

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
