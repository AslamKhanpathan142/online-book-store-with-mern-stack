const Feedback = require('../models/feedbacks');


const giveFeedback = async(req, res) => {
    const userId = req.user.id;
    const {subject, message} = req.body;
    try {
        const feedback = await Feedback.create({
            userId,
            subject,
            message,
        })
        res.status(200).json({message : "Give Feedback Successfully",feedback});
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

const showAllFeedback = async(req, res) => {
    try {
        const allFeedback = await Feedback.find().populate('userId' , 'name email');
        res.status(200).json(allFeedback)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    giveFeedback,
    showAllFeedback
}