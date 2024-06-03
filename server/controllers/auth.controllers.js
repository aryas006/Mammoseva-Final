const User = require('../models/user.models')
const bcrypt = require('bcrypt')    
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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

const updateData = async (req, res) => {
    const { token, name, email, password, periodDate } = req.body
    try {
        if (!token || (!name && !email && !password && !periodDate)) {
            return res.json({ message: "Please select atleast one field to update" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const userEmail = decoded.email

        const user = await  User.findOne({ email: userEmail })
        if (!user) {
            return res.json({ message: "User does not exist" })
        }

        if(name) user.name = name
        if(email) user.email = email
        if(password) user.password = await bcrypt.hash(password, 12)
        if(periodDate) user.periodDate = periodDate

        await user.save({ name, email, password, periodDate })

        res.status(200).json({ message: "User data updated successfully", data: user })
    } catch (error) {
        console.error(error)
    }
}

const forgetPassword = async (req, res) => {
    const { email } = req.body
    try {
        const userExists = await User.findOne({ email })
        if (!userExists) {
            return res.json({ message: "User does not exist" })
        }
        const { _id, name } = userExists;
        const token = jwt.sign({ email: userExists.email, id: userExists._id }, process.env.JWT_SECRET, { expiresIn: '5m' })
        const link = `http://192.168.0.107:9000/resetPassword/${userExists._id}/${token}`
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
             user: process.env.SENDER_EMAIL,
             pass: process.env.APP_PASSWORD,
            },
           });
          
          var mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: req.body.email,
            subject: 'Password Reset Link',
            text: `Dear ${name},

            We received a request to reset the password for your Mammoseva account. If you made this request, please click the link below to reset your password:
            
            Reset Password: ${link}
            
            Please note that this link will expire in 5 minutes. If you do not reset your password within this time, you will need to request a new password reset link.
            
            If you did not request a password reset, please ignore this email. Your account will remain secure, and no changes will be made.
            
            Thank you for using Mammoseva!
            
            Best regards,
            Team Mammoseva`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        console.log(link)
    } catch (error) {
        console.error(error)
    }
}

const resetPassword = async (req, res) => {
    const { id, token } = req.params
    const { password } = req.body
    try {
        const userExists = await User.findOne({ _id: id })
        if (!userExists) {
            return res.json({ message: "User does not exist" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const hashedPassword = await bcrypt.hash(password, 12)
        await User.updateOne({ _id: id }, {$set: { password: hashedPassword }})
        res.json({ message: "Password reset successfully"})
    } catch (error) {
        console.error(error)
    }
}

module.exports = { register, login, userdata, updateData, forgetPassword, resetPassword }