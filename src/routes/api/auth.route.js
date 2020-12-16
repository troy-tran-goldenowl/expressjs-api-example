const express = require('express');
const { validate } = require('express-validation');
const { loginValidation, signupValidation } = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.route('/signup')
  .post(validate(signupValidation), authController.signup);

router.route('/login')
  .post(validate(loginValidation), authController.login);

module.exports = router;
