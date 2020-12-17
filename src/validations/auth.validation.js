const { Joi } = require('express-validation');

module.exports = {
  signupValidation: {
    body: Joi.object({
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    }),
  },
  loginValidation: {
    body: Joi.object({
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    }),
  },
};
