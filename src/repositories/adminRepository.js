const { PricingPlan } = require("../models");

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

exports.updatePricingPlan = (updatePackage, id) => {
  return PricingPlan.update(updatePackage, {
    where: {
      id: id,
    },
  });
};
