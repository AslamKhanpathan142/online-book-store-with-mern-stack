const User = require('../models/users');
const jwt = require('jsonwebtoken');

const protect = async(req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: "Please First Login"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // .select('-password') :- -password means password ke alawa
        const user = await User.findById(decoded.id).select('-password')
        req.user = user;
        next();
    } catch (error) {
        res.status(500).json({message: "Please First Login"})
    }
}

module.exports = protect;






