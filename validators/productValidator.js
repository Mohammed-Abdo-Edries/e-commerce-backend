const Joi = require("joi");

const productSchema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
});

module.exports = {
  productSchema,
};