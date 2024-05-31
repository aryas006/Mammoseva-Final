const User = require('../models/user.models')
const bcrypt = require('bcrypt')    
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    try {
        const { name, email, password, periodDate } = req.body
        if (!name || !email || !password || !periodDate) {
            return res.json({ message: "Please fill in all fields" })
        }
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ message: "User already exists" })
        } else {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = await User.create({ name, email, password: hashedPassword, periodDate })
            console.log(newUser)
            res.status(201).json({ 'success': `New user ${newUser.name} created successfully.` })
        }
    } catch (error) {
        console.error(error)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const isPasswordValid = await bcrypt.compare(password, userExists.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ email: userExists.email }, process.env.JWT_SECRET )
        return res.status(200).json({ message: "Login successful", data: token });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: "Server error" });
    }
}

const userdata = async (req, res) => {
    const { token } = req.body
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        const userEmail = user.email

        User.findOne({ email: userEmail })
            .then((data) => {
                return res.send({ data: data })
            })
    } catch (error) {
        console.error(error)
    }
}

module.exports = { register, login, userdata }