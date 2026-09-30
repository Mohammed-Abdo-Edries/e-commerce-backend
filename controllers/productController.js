const Product = require("../models/productModel");
const fs = require("fs/promises");
const path = require("path");
const {
  uploadImageToS3,
  deleteImageFromS3,
} = require("../services/s3Services");

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
  let imageKey = null;

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

    if (!req.file) {
      return res.status(400).json({
        message: "Product image is required",
      });
    }

    const uploadedImage = await uploadImageToS3(req.file);
    imageKey = uploadedImage.imageKey;

    const product = await Product.create({
      name,
      price,
      description,
      category,
      subCategory,
      sizes: sizes || [],
      imgURL: uploadedImage.imageUrl,
      bestseller: bestseller || false,
    });

    return res.status(201).json({
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    if (imageKey) {
      try {
        await deleteImageFromS3(imageKey);
      } catch (deleteError) {
        console.error(
          "Failed to delete uploaded image from S3:",
          deleteError.message
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
        if (product.imageKey) {
          await deleteImageFromS3(product.imageKey);
      }
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