const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidators");
const userService = require("../services/userService");
const bcryptService = require("../services/bcryptService");
const tokenService = require("../services/tokenService");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    // validate

    const value = validateRegister(req.body);

    const isUserExist = await userService.checkEmailExist(value.email);
    if (isUserExist) {
      createError("email adress number already in use", 400);
    }
    //hash password
    value.password = await bcryptService.hash(value.password);

    //inser to user table
    const user = await userService.createUser(value);

    //sign token and sent response
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);

    const user = await userService.getUserByEmail(value.email);
    console.log(user);
    if (!user) {
      createError("invalid credential", 400);
    }
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError("invalid credential", 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  res.status(200).json({ user: req.user });
};
