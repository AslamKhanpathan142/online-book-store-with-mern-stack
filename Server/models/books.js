const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    author : {
        type: String,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    category : {
        type: String,
        required: true,
    },
    imageURL : {
        type: String, // e.g. 'image/png' or 'image/jpeg'
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('book', bookSchema);