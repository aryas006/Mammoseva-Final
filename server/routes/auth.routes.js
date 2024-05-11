const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/auth.controllers');

router.post('/register', authControllers.register)

module.exports = router;