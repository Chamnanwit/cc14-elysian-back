const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email({ tlds: false }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
  role: Joi.string(),
});

const loginSchema = Joi.object({
  emailOrMobile: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
