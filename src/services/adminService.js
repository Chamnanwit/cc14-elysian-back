const { token } = require("morgan");
const adminRepository = require("../repositories/adminRepository");

exports.createPackage = (package) => adminRepository.createPackage(package);

exports.getPackageById = (id) => adminRepository.getPackageById(id);

exports.getAllPricingPlan = () => adminRepository.getAllPricingPlan();

exports.deletePricingPlan = (id) => adminRepository.deletePricingPlan(id);

exports.updatePricingPlan = (updatePackage) =>
  adminRepository.updatePricingPlan(updatePackage);

exports.createOptionalType = (optionalType) =>
  adminRepository.createOptionalType(optionalType);

exports.getAllOptionalType = () => adminRepository.getAllOptionalType();

exports.getOptionalTypeById = (id) => adminRepository.getOptionalTypeById(id);

exports.deleteOptionalType = (id) => adminRepository.deleteOptionalType(id);

exports.updateOptionalType = (updateOptionalType, id) =>
  adminRepository.updateOptionalType(updateOptionalType, id);

exports.createOptional = (optional) => adminRepository.createOptional(optional);

exports.getAllOptional = () => adminRepository.getAllOptional();

exports.getOptionalById = (id) => adminRepository.getOptionalById(id);

exports.deleteOptional = (id) => adminRepository.deleteOptional(id);

exports.updateOptional = (updateOptional, id) =>
  adminRepository.updateOptional(updateOptional, id);

exports.updateProfileAdmin = (updateProfile) =>
  adminRepository.updateProfileAdmin(updateProfile);

exports.updateAdminForm = (updateForm) =>
  adminRepository.updateAdminForm(updateForm);

exports.deleteAdminForm = (id) => adminRepository.deleteAdminForm(id);
