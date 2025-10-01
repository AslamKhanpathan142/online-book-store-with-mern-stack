const {userProfile, updateProfile} = require('../controllers/userController');
const express = require('express');
const protect = require("../middleware/protectMiddleware")

const router = express.Router();

router.get('/userProfile', protect, userProfile);
router.put('/updatedProfile', protect, updateProfile);

module.exports = router;