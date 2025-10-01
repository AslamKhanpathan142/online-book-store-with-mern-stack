const mongoose = require("mongoose");

const orderAdminShema = new mongoose.Schema({
    orId : {
        type: String,
        required: true,
    },
    bookTitle : {
        type: String,
        required: true,
    },
    userName : {
        type: String,
        required: true,
    },
    userEmail : {
        type: String,
        required: true,
    },
    date : {
        type: Date,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    createdAt  : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('orderAdmin', orderAdminShema)