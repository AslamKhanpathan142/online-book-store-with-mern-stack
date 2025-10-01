const mongoose = require('mongoose')

const feedbackSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    subject : {
        type: String,
        required: true,
    },
    message : {
        type: String,
        required: true,
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('feedback', feedbackSchema);