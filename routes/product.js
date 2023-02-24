const Product = require('../models/productModel')
const upload = require("../multer")
// const fs = require("fs/promises")
// const path = require("path");
const express = require('express')
const router = express.Router()
require ('dotenv').config()
const onlyAdmin = require("../middlewares/onlyAdmin")
  
router.get("/" , async (req, res) => {
    try {
        const category = req.headers.category || null;
        const products = await Product.find({ category });
        return res.json(products);
    } catch (error) {
        console.log(error);
    }
});

router.post("/create", upload, async (req, res) => {
    try {
        const { name, price, category } = req.body;
        const { filename: imgURL } = req.file;
        const product = await Product.create({
            name, price, category, imgURL
        });
    if (product) {
        return res.json({ mssg: "Product Created Successfuly"});
    } else {
        console.log("something went wrong");
        return res.status(500).json({ mssg: "something went wrong"});
    }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ mssg: "something went wrong"});
    }
    });

module.exports = router;