const agencyRepository = require("../repositories/agencyRepository");
const { Image } = require("../models");

exports.createProperty = (property) =>
  agencyRepository.createProperty(property);

exports.uploadMultiFiles = (files) => Image.bulkCreate(files);
exports.createProperty = (property) =>
  agencyRepository.createProperty(property);

exports.getPropertyById = (id) => agencyRepository.getPropertyById(id);

exports.getAllProperty = () => agencyRepository.getAllProperty();

exports.deleteProperty = (id) => agencyRepository.deleteProperty(id);

exports.updatePropertyById = (updateProperty) =>
  agencyRepository.updatePropertyById(updateProperty);

exports.updateProperties = (updateProperty) =>
  agencyRepository.updateProperties(updateProperty);

exports.getAllImagePropertyById = (id) =>
  agencyRepository.getAllImagePropertyById(id);

exports.updateProfileAgency = (updateProfile) =>
  agencyRepository.updateProfileAgency(updateProfile);

exports.getAllAgency = () => agencyRepository.getAllAgency();

exports.getAgencyById = (id) => agencyRepository.getAgencyById(id);

exports.getTotalPropertyById = (id) =>
  agencyRepository.getTotalPropertyById(id);

exports.getTotalInactiveProperty = (id) =>
  agencyRepository.getTotalInactiveProperty(id);

exports.getTotalActiveProperty = (id) =>
  agencyRepository.getTotalActiveProperty(id);

exports.getTotalPurchase = (id) => agencyRepository.getTotalPurchase(id);

exports.getAllFromAgency = () => agencyRepository.getAllFromAgency();

exports.deleteProfileAgency = (id) => agencyRepository.deleteProfileAgency(id);

exports.getPropertyByAgencyId = (id) =>
  agencyRepository.getPropertyByAgencyId(id);

exports.getPurchaseHistoryById = (id) =>
  agencyRepository.getPurchaseHistoryById(id);

exports.getAllSubDistrict = () => agencyRepository.getAllSubDistrict();

exports.getAllProvince = () => agencyRepository.getAllProvince();

exports.deleteImageProperty = (id) => agencyRepository.deleteImageProperty(id);
