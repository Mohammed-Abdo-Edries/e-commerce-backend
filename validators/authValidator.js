const Joi = require("joi");

const signupSchema = Joi.object({
  firstname: Joi.string()
    .min(3)
    .max(20)
    .required(),

  lastname: Joi.string()
    .min(3)
    .max(20)
    .required(),

  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .min(8)
    .required(),
});


const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),

  password: Joi.string()
    .required(),
});


module.exports = {
  signupSchema,
  loginSchema,
};