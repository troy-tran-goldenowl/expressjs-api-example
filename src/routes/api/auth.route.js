const express = require('express');
const { validate } = require('express-validation');
const { createPostValidation } = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');

const router = express.Router();

router.route('/signup')
  .post(validate(createPostValidation), authController.signup);

module.exports = router;
