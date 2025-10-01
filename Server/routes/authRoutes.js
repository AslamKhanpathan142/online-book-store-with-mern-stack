const express = require('express')
const { Register, useLogin} = require('../controllers/authController')

const router = express.Router();

router.post('/register', Register)
router.post('/useLogin', useLogin)

module.exports = router