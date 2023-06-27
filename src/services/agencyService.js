const agencyRepository = require("../repositories/agencyRepository");

<<<<<<< HEAD
exports.createProperty = (property) => userRepository.create(property);

exports.uploadMultiFiles = (files) => Image.bulkCreate(files);
=======
exports.createProperty = (property) =>
  agencyRepository.createProperty(property);

exports.getPropertyById = (id) => agencyRepository.getPropertyById(id);

exports.getAllProperty = () => agencyRepository.getAllProperty();

exports.deleteProperty = (id) => agencyRepository.deleteProperty(id);

exports.updateProfileAgency = (updateProfile) =>
  agencyRepository.updateProfileAgency(updateProfile);
>>>>>>> ba05e050d816166a259ce314f620517f04d359ce
