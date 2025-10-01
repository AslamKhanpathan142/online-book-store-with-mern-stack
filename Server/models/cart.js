const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    items : {
        type: mongoose.Types.ObjectId,
        ref: 'book',
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now,
    }
})

module.exports = mongoose.model('cart', cartSchema);