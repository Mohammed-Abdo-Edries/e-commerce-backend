// const upload = require("../multer")
const express = require('express')
const router = express.Router()
const onlyAdmin = require("../middlewares/onlyAdmin")
const upload = require("../multer")
const validate = require("../middlewares/validate");
const { productSchema } = require("../validators/productValidator");
// const multer = require("multer");
// const storage = multer.memoryStorage();
const {
  getProducts,
  createNewProduct,
//   updateProduct,
  deleteProduct,
  deleteAllProducts,
  getSingleProduct,
} = require("../controllers/productController");
router.get("/", getProducts);
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

router.get("/:id", getSingleProduct)
router.post("/create", onlyAdmin, upload, createNewProduct);
router.delete("/delete", onlyAdmin, deleteProduct)
router.delete("/deleteAllProudcts", onlyAdmin, deleteAllProducts)
module.exports = router;