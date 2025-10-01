const express = require("express");
const {giveFeedback, showAllFeedback} = require('../controllers/feedbackController');
const protect = require('../middleware/protectMiddleware')

const router = express.Router();

router.post('/giveFeedback', protect, giveFeedback);
router.get('/showAllFeedback', showAllFeedback);


module.exports = router;