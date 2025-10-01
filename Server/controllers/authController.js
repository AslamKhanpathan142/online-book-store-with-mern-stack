const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Register = async(req, res) => {
    const { name, email, phone, password, role } = req.body;

    try {
        const isExist = await User.findOne({email});
        if(isExist) return res.status(400).json({message: "User is Already Login"})
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            role,
        })
        const token = jwt.sign({id: user._id, name: user.name, email: user.email, phone: user.phone}, process.env.JWT_SECRET, {expiresIn: '7d'})
        res.status(200).json({
            message: "Register Successfull",
            user: {id: user._id, name: user.name, email: user.email, phone: user.phone},
            token,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const useLogin = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message: 'Invalid Email'})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message: "Invalid Password"});
        const token = jwt.sign({id: user._id, name: user.name, email: user.email, phone: user.phone}, process.env.JWT_SECRET,{expiresIn: '7d'});
        res.status(200).json({message: "Login Successfully", user: {id: user._id, name: user.name, email: user.email, phone: user.phone, role: user.role},
        token,
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    Register,
    useLogin
}