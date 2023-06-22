require("dotenv").config();

const { sequelize } = require("../models");

sequelize
  .sync({ alter: true })
  .then(() => process.exit(0))
  .catch((err) => process.exit(1));
