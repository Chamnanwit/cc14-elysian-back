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
