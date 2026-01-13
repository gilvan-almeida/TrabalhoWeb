const express = require('express');
const router = express.Router();
const authController = require("../Controllers/AuthController");
const { authenticate } = require("../Middleware/Auth");


router.post('/login', authController.login);

router.get('/profile', authenticate, authController.getProfile);

module.exports = router;