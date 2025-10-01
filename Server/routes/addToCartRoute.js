const express = require('express')
const {addToCart, showaddToCart, deleteAddToCart} = require('../controllers/cartController');
const protect = require('../middleware/protectMiddleware')

const router = express.Router();

router.post('/addToCart', protect, addToCart);
router.get('/showAddToCart', protect, showaddToCart);
router.delete('/deleteAddToCart/:id', deleteAddToCart);

module.exports = router;