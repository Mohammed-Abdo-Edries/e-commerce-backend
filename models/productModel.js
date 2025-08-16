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
        enum: ["men", "women", "kids"],
        required: true
    },
    subCategory: {
        type: String,
        enum: ["topwaer", "bottomwear", "winterwear"],
        required: true
    },
    details: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
