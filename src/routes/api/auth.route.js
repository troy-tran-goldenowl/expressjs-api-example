const express = require('express');
const { validate } = require('express-validation');
const { loginValidation, signupValidation } = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const { authMiddleware } = require('../../middlewares/auth');

const router = express.Router();

router.post('/signup', validate(signupValidation), authController.signup);

router.post('/login', validate(loginValidation), authController.login);

router.get('/profile', authMiddleware, authController.getProfile);

module.exports = router;
