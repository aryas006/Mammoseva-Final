const User = require('../models/user.models')
const bcrypt = require('bcrypt')    

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
        const { email, password } = req.body
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.json({ message: "User does not exist" })
        }
        const user = await bcrypt.compare(password, userExists.password)
        if (!user) {
            return res.json({ message: "Invalid credentials" })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = { register, login }