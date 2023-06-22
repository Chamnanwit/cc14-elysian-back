const userRepository = require("../repositories/userRepository");

exports.createProperty = (property) => userRepository.create(property);
