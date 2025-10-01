const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderId : {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items : {
        type: mongoose.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    ordId : {
        type: String,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('order', orderSchema);