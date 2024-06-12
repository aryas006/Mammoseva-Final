const express = require('express');
const authRouter = express.Router();
const authControllers = require('../controllers/auth.controllers');

authRouter.post('/register', authControllers.register)
authRouter.post('/login', authControllers.login)
authRouter.post('/userdata', authControllers.userdata)
authRouter.put('/updateData', authControllers.updateData)
authRouter.post('/forgetPassword', authControllers.forgetPassword)
authRouter.post('/resetPassword/:id/:token', authControllers.resetPassword)

module.exports = authRouter;