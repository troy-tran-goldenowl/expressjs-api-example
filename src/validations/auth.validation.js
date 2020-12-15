const { Joi } = require('express-validation');

module.exports = {
  createPostValidation: {
    body: Joi.object({
      username: Joi.string()
        .required(),
      password: Joi.string()
        .required(),
    }),
  },
};
