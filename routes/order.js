const express = require("express");

const router = express.Router();
const validate = require("../middlewares/validate");
const { orderSchema } = require("../validators/orderValidator");
const auth = require("../middlewares/authMiddleware");
const onlyAdmin = require("../middlewares/onlyAdmin");

const {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByStatus,
  createOrder,
  deleteOrder,
} = require("../controllers/orderController");


// ADMIN
router.get("/getAllOrders", auth, onlyAdmin, getAllOrders);

router.get(
  "/getOrdersByStatus/:status",
  auth,
  onlyAdmin,
  getOrdersByStatus
);


// AUTHENTICATED USERS
router.get(
  "/getOrderById/:id",
  auth,
  getOrderById
);

router.get(
  "/getOrdersByUserId",
  auth,
  getOrdersByUserId
);

router.post(
  "/createOrder",
  auth,
  validate(orderSchema),
  createOrder
);

router.delete(
  "/deleteOrder/:id",
  auth,
  deleteOrder
);


module.exports = router;