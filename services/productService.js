const Product = require("../models/product");

const getAllProducts = async () => {
    return await Product.find({});
};

const createProduct = async (productData) => {
  return await Product.create(productData);
};

module.exports = {
  createProduct,
  getAllProducts
};