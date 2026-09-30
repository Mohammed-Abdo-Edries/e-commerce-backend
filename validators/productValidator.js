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

  sizes: Joi.alternatives()
  .try(
    Joi.array().items(Joi.string()),
    Joi.string().custom((value, helpers) => {
      try {
        const parsed = JSON.parse(value);

        if (!Array.isArray(parsed)) {
          return helpers.error("any.invalid");
        }

        return parsed;
      } catch {
        return helpers.error("any.invalid");
      }
    })
  )
  .default([]),

  bestseller: Joi.boolean()
    .default(false),
});

module.exports = {
  productSchema,
};