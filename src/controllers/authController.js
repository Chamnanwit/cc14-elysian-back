const {
  validateRegister,
  validateLogin,
} = require("../validators/auth-validators");
const userService = require("../services/user-service");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    // validate
    const value = validateRegister(req.body);
    const isUserExist = await userService.checkEmail(value.email);
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
