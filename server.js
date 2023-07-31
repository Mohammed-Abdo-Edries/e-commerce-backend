const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const path = require("path");
const cors = require('cors')
const app = express()

require('dotenv').config()
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json())
app.use('/user', userRoutes)
app.use('/product', productRoutes)
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