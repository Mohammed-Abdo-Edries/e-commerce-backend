const express = require('express')
const mongoose = require('mongoose')
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
const cors = require('cors')
const path = require("path");
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRouts = require('./routes/order')
const Product = require('./models/productModel')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/orders', orderRouts)

const calculateAmount = async (items) => {
    const _id = items[0].id
    console.log(_id)
    const product = await Product.findById({ _id })
    const price = items[0].amount * product.price
    console.log(price)
    return price * 100;
};
const calculateOrderAmount = (items) => {
    var price = 0
    items.map(async (item) => {
        const _id = item.id;
        const product = await Product.findById({ _id });
        const fullPrice = item.amount * product.price
        console.log(`item total is ${fullPrice}`)
        price += fullPrice
        console.log(`inside the map is ${price}`)
    }
    );
    console.log(`outside the map is ${price}`)
    return price
};

app.post('/create-payment-intent', async (req, res) => {
    const { items } = req.body;
    console.log(items)
    const paymentIntent = await stripe.paymentIntents.create({
        amount: items.length > 1 ? calculateOrderAmount(items) : calculateAmount(items),
        currency: "cad",
        automatic_payment_methods: {
            enabled: true
        },
    });
    res.status(200).send({
        clientSecret: paymentIntent.client_secret
    })
})

mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listeneing on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })