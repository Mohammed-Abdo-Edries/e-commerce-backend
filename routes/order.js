const Order = require('../models/orderModel')
const express = require('express')
const router = express.Router()

router.get('/getAllOrders', async (req, res) => {
    try {
        const allOrders = await Order.find({}).sort({ createdAt: -1 });
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.get('/getOrderById', async (req, res) => {
    try {
        const order = await Order.findById(req.headers._id)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.get('/getOrdersByUserId', async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.headers._id })
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.get('/getOrdersByStatus', async (req, res) => {
    try {
        const order = await Order.find({ status: req.header.status })
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.post('/createOrder', async (req, res) => {
    try {
        const newOrder = await Order.create(req.body)
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});
router.delete('/deleteOrder', async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.header._id)
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
});

module.exports = router;