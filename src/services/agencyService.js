const agencyRepository = require("../repositories/agencyRepository");
const { Image } = require("../models");

exports.createProperty = (property) => userRepository.create(property);

exports.uploadMultiFiles = (files) => Image.bulkCreate(files);
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

exports.getPropertyByAgencyId = (id) =>
  agencyRepository.getPropertyByAgencyId(id);

exports.getPurchaseHistoryById = (id) =>
  agencyRepository.getPurchaseHistoryById(id);
