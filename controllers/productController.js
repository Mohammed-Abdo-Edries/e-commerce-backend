const Product = require("../models/productModel");
const fs = require("fs/promises");
const path = require("path");


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// GET SINGLE PRODUCT
const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// CREATE PRODUCT
const createNewProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const imgURL = req.file ? req.file.filename : null;

    if (!imgURL) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const product = await Product.create({
      name,
      price,
      description,
      category,
      subCategory,
      sizes: sizes || [],
      imgURL,
      bestseller: bestseller || false,
    });

    return res.status(201).json({
      message: "Product Created Successfully",
      product,
    });

  } catch (error) {

    if (req.file) {
      const filePath = path.join(
        __dirname,
        "..",
        "images",
        req.file.filename
      );

      try {
        await fs.unlink(filePath);
      } catch (unlinkError) {
        console.error(
          "Failed to delete uploaded file:",
          unlinkError.message
        );
      }
    }

    next(error);
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.headers;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (product.imgURL) {
      const imagePath = path.join(
        __dirname,
        "..",
        "images",
        product.imgURL
      );

      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.log(
          "Image could not be deleted:",
          error.message
        );
      }
    }

    await product.destroy();

    return res.status(200).json({
      message: "Product Deleted",
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// DELETE ALL PRODUCTS BY CATEGORY
const deleteAllProducts = async (req, res) => {
  try {
    const { category } = req.headers;

    const deletedCount = await Product.destroy({
      where: {
        category,
      },
    });

    return res.status(200).json({
      message: "All products deleted successfully",
      deletedCount,
    });

  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


module.exports = {
  getProducts,
  createNewProduct,
  deleteProduct,
  getSingleProduct,
  deleteAllProducts,
};