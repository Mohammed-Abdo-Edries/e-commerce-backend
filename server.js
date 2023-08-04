const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRouts = require('./routes/order')
const stripeRouts = require('./routes/stripe')
const path = require("path");
const cors = require('cors')
const app = express()
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
require('dotenv').config()

app.use(cors())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json())
app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/orders', orderRouts)
app.use('/', stripeRouts)
app.use(express.urlencoded({ extended: false }));


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