const Product = require('../models/productModel')
const upload = require("../multer")
const fs = require("fs/promises")
const path = require("path");
const express = require('express')
const router = express.Router()
const onlyAdmin = require("../middlewares/onlyAdmin")
// const cloudinary = require("cloudinary").v2;
// const multer = require("multer");
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
// const { cloudinaryConfig } = require("../config/cloudinaryConfig");
router.get("/", async (req, res) => {
    try {
        // const category = req.headers.category || null;
        const products = await Product.find({}).sort({ createdAt: -1 });
        return res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

// router.get("/suggestions", async (req, res) => {
//     try {
//         const products = await Product.find({})
//         return res.status(200).json(products);
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// });
// router.get("/search", async (req, res) => {
//     try {
//         const name = req.headers.name;
//         const products = await Product.find({ name: name })
//         if (products) {
//             return res.status(200).json(products);
//         } else {
//             return res.status(200).json({ message: 'there are no products with this name' })
//         }
//     } catch (error) {
//         res.status(400).json({ message: error.message })
//     }
// });

router.get("/:id", async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const product = await Product.findById({ _id });
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post(
  "/create",
  onlyAdmin,
  upload,
  async (req, res, next) => {
    try {
      const { name, price, description, category, subCategory, bestseller } = req.body;
  const imgURL = req.file ? req.file.filename : null;
      const product = await Product.create({
        name,
        price,
        description,
        category,
        subCategory,
        imgURL: imgURL,
        bestseller,
      });

      return res.status(200).json({ message: "✅ Product Created Successfully", product });
    } catch (error) {
    if (req.file) {
      const filePath = path.join(__dirname, "images", req.file.filename);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Failed to delete file:", err);
        else console.log("Rolled back file:", req.file.filename);
      });
    }
      next(error);
    }
  }
);

router.delete("/delete", onlyAdmin, async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const deletedProduct = await Product.findByIdAndDelete({ _id });
        if (deletedProduct) {
            if (deletedProduct.imgURL) {
                await fs.unlink(
                    path.join(__dirname, "..", "images", deletedProduct.imgURL) || null
                );
            } else {
                null
            }
            return res.status(200).json({ message: "Product Deleted" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
})

router.delete("/deleteAllProudcts", onlyAdmin, async (req, res) => {
    try {
        const category = req.headers.category;
        const products = await Product.deleteMany({ category: category })
        return res.status(200).json({ message: "all products deleted succesfuly" })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error.message });
    }
})
module.exports = router;