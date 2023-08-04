const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgURL: { type: String, required: true },
    category: {
        type: String,
        enum: ["pants", "shirt", "dress", "shoes"],
        required: true
    },
    details: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
