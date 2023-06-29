const { User, Property } = require("../models");

exports.getUserByEmail = (email) => {
  return User.findOne({
    where: {
      email: email,
    },
    paranoid: false,
    // ถ้าไม่ตั้งค่า paranoid: false การใช้findOne ก็จะไม่เจอ user ในระบบ
  });
};

exports.createUser = (user) => User.create(user);

exports.getUserById = (id) => User.findByPk(id);
