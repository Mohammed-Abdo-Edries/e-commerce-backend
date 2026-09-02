const Joi = require("joi");

const productSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(100)
    .required(),

  price: Joi.number()
    .positive()
    .required(),

  description: Joi.string()
    .required(),

  category: Joi.string()
    .valid("Men", "Women", "Kids")
    .required(),

  subCategory: Joi.string()
    .valid("Topwear", "Bottomwear", "Winterwear")
    .required(),

  sizes: Joi.array()
    .items(Joi.string())
    .default([]),

  bestseller: Joi.boolean()
    .default(false),
});

module.exports = {
  productSchema,
};