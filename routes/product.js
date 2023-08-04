const Product = require('../models/productModel')
const upload = require("../multer")
const fs = require("fs/promises")
const path = require("path");
const express = require('express')
const router = express.Router()
const onlyAdmin = require("../middlewares/onlyAdmin")

router.get("/", async (req, res) => {
    try {
        const category = req.headers.category || null;
        const products = await Product.find({ category }).sort({ createdAt: -1 });
        return res.status(200).json(products);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const product = await Product.findById({ _id });
        return res.status(200).json(product)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }
})

router.post("/create", upload, onlyAdmin, async (req, res) => {
    try {
        const { name, price, category, details } = req.body;
        const { filename: imgURL } = req.file;
        const product = await Product.create({
            name, price, category, imgURL, details
        });
        if (product) {
            return res.status(200).json({ message: "Product Created Successfuly" });
        }
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

router.delete("/delete", onlyAdmin, async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const deletedProduct = await Product.findByIdAndDelete({ _id });
        if (deletedProduct) {
            await fs.unlink(
                path.join(__dirname, "..", "images", deletedProduct.imgURL) || null
            );
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