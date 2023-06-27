const agencyRepository = require("../repositories/agencyRepository");

exports.createProperty = (property) =>
  agencyRepository.createProperty(property);

exports.getPropertyById = (id) => agencyRepository.getPropertyById(id);

exports.getAllProperty = () => agencyRepository.getAllProperty();

exports.deleteProperty = (id) => agencyRepository.deleteProperty(id);

exports.updateProfileAgency = (updateProfile) =>
  agencyRepository.updateProfileAgency(updateProfile);

exports.getAllAgency = () => agencyRepository.getAllAgency();
