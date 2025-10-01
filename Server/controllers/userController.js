const User = require('../models/users')
const userProfile = async(req, res) => {
    try {
        res.status(200).json(req.user)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateProfile = async(req, res) => {
    const {name, email, phone } = req.body;
    const userId = req.user.id;
    try {
        const updated = await User.findByIdAndUpdate(userId, {
            name,
            email,
            phone,
        },
      {new: true})
      if(!updated) return res.status(400).json({message: "User is not found"});
      res.status(200).json(updated);
    } catch (error) {
        res.json({message: error.message})
    }
}

module.exports = {
    userProfile,
    updateProfile,
}