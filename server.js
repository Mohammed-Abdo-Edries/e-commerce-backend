const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require("path");
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const orderRouts = require('./routes/order')
const {EventEmitter} = require("node:events");
require('dotenv').config()
const emitter = new EventEmitter();
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use('/product', productRoutes)
app.use('/user', userRoutes)
app.use('/orders', orderRouts)
console.log(process.env.MONGO_URI)
mongoose.set("strictQuery", false)
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('listeneing on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


