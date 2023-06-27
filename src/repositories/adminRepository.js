const { User, PricingPlan, OptionalType, Optional } = require("../models");

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
  });
