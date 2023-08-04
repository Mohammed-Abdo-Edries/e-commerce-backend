const Product = require('../models/productModel')
const express = require('express')
const router = express.Router()

const calculateOrderAmount = (items) => {
    var totalPrice = 0
    items.forEach((item) => {
        if (item.id, item.amount) {
            const _id = item.id
            const product = Product.findById({ _id });
            const price = item.amount * product.price
            totalPrice += price
        }
    })
    return totalPrice
}
router.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "cad",
        automatic_payment_methods: {
            enabled: true
        },
    });
    res.send({
        clientSecret: paymentIntent.client_secret
    })
})
module.exports = router;