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
    description: {
        type: String,
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
    bestseller: {
        type: Boolean,
        default: false
    }
    
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
