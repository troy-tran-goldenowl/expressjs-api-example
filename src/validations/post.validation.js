const { Joi } = require('express-validation');

module.exports = {
  createPostValidation: {
    body: Joi.object({
      title: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      body: Joi.string()
        .required(),
    }),
  },
  editPostValidation: {
    body: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      body: Joi.string(),
    }),
  },
  deletePostValidation: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
  getPostValidation: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
