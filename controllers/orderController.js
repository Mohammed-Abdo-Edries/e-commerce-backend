const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Product = require("../models/productModel");
// GET ALL ORDERS
// ADMIN ONLY
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// GET ORDER BY ID
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // User can only access their own order unless they are admin
    if (!user.isAdmin && order.buyer !== user.id) {
      return res.status(403).json({
        message: "You are not allowed to access this order",
      });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// GET ORDERS BY USER ID
const getOrdersByUserId = async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: {
        buyer: req.userId,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// GET ORDERS BY STATUS
// ADMIN ONLY
const getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const orders = await Order.findAll({
      where: {
        status,
      },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { products, adsress } = req.body;
for (const item of products) {
      const product = await Product.findByPk(item.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product not found: ${item.productId}`,
        });
      }
    }
    const order = await Order.create({
      products,
      buyer: req.userId,
      adsress,
    });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


// DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    const user = await User.findByPk(req.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Only admin can delete orders
    if (!user.isAdmin) {
      return res.status(403).json({
        message: "You are not allowed to delete this order",
      });
    }

    await order.destroy();

    return res.status(200).json({
      message: "Order deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersByStatus,
  createOrder,
  deleteOrder,
};