const { token } = require("morgan");
const adminRepository = require("../repositories/adminRepository");

exports.createPackage = (package) => adminRepository.createPackage(package);

exports.getPackageById = (id) => adminRepository.getPackageById(id);

exports.getAllPricingPlan = () => adminRepository.getAllPricingPlan();

exports.deletePricingPlan = (id) => adminRepository.deletePricingPlan(id);

exports.updatePricingPlan = (updatePackage) =>
  adminRepository.updatePricingPlan(updatePackage);
