const Joi = require("joi");

const orderSchema = Joi.object({
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required(),
        size: Joi.string().required(),
      })
    )
    .min(1)
    .required(),

  adsress: Joi.string().required(),
});

module.exports = {
  orderSchema
};