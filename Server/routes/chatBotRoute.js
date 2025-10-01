const express = require('express');
const {chatBot} = require('../controllers/chatBotController')

const router = express.Router();

router.post('/chatBot', chatBot)


module.exports = router