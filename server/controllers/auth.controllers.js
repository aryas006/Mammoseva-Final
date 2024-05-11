const User = require('../models/user.models')

const register = async (req, res) => {
    try {
        const { name, email, password, cpassword, periodDate } = req.body
        const userExists = await User.findOne({ email })
        if (userExists) {
            return res.json({ message: "User already exists" })
        } else {
            await User.create({ name, email, password, cpassword, periodDate })
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = { register }