const express = require('express');
const protect = require("../middleware/protectMiddleware");
const {bookOrder, showUserOrder, showAllOrder} = require('../controllers/orderController')

const router = express.Router();

router.post('/bookOrder', protect, bookOrder);
router.get('/userOrder', protect, showUserOrder);
router.get('/allorder', showAllOrder);

module.exports = router;