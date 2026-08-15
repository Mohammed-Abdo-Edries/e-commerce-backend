const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    products: {
        type: Array,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    adsress: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    onWay: {
        type: Boolean,
        default: false
    },
    delivered: {
        type: Boolean,
        default: false
    },
    orderDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
