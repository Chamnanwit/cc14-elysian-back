const agencyRepository = require("../repositories/agencyRepository");

exports.createProperty = (property) =>
  agencyRepository.createProperty(property);

exports.getPropertyById = (id) => agencyRepository.getPropertyById(id);

exports.getAllProperty = () => agencyRepository.getAllProperty();

exports.deleteProperty = (id) => agencyRepository.deleteProperty(id);

exports.updateProfileAgency = (updateProfile) =>
  agencyRepository.updateProfileAgency(updateProfile);

exports.getAllAgency = () => agencyRepository.getAllAgency();

exports.getAgencyById = (id) => agencyRepository.getAgencyById(id);

exports.getAllFromAgency = () => agencyRepository.getAllFromAgency();

exports.deleteProfileAgency = (id) => agencyRepository.deleteProfileAgency(id);

// exports.getPurchase = () => agencyRepository.getPurchase();

// exports.getNewUser = () => agencyRepository.getNewUser();

// exports.getProperty = () => agencyRepository.getProperty();

// exports.getAgencyResult = () => agencyRepository.getAgencyResult();

// exports.getEarning = () => agencyRepository.getEarning();
