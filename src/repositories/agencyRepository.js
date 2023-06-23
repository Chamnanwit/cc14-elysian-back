const { Property } = require("../models");

exports.createProperty = (property) => Property.create(property);

exports.getAllProperty = () => Property.findAll();

exports.getPropertyById = (id) => {
  return Property.findOne({
    where: {
      id: id,
    },
  });
};

exports.deleteProperty = (id) => {
  return Property.destroy({
    where: {
      id: id,
    },
  });
};
