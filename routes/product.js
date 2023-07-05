const Product = require('../models/productModel')
const upload = require("../multer")
const fs = require("fs/promises")
const path = require("path");
const express = require('express')
const router = express.Router()
require('dotenv').config()
const onlyAdmin = require("../middlewares/onlyAdmin")

router.get("/", async (req, res) => {
    try {
        const category = req.headers.category || null;
        const products = await Product.find({ category });
        return res.json(products);
    } catch (error) {
        console.log(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const product = await Product.findById({ _id });
        return res.status(200).json(product)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ mssg: error })
    }
})

router.post("/create", upload, async (req, res) => {
    try {
        const { name, price, category, details } = req.body;
        const { filename: imgURL } = req.file;
        const product = await Product.create({
            name, price, category, imgURL, details
        });
        if (product) {
            return res.json({ mssg: "Product Created Successfuly" });
        } else {
            console.log("something went wrong");
            return res.status(500).json({ mssg: "something went wrong" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mssg: "something went wrong" });
    }
});

router.delete("/delete", async (req, res) => {
    try {
        const { id: _id } = req.headers;
        const deletedProduct = await Product.findByIdAndDelete({ _id });
        if (deletedProduct) {
            await fs.unlink(
                path.join(__dirname, "..", "images", deletedProduct.imgURL) || null
            );
            return res.json({ message: "Product Deleted" });
        } else {
            return res.status(400).json({ message: "Product dose not exist" });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
})

router.delete("/deleteAllProudcts", async (req, res) => {
    try {
        const category = req.headers.category;
        const products = await Product.deleteMany({ category: category })
        return res.status(200).json(products)
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: error });
    }
})
module.exports = router;