const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

/**
 * Schema
 */
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

/**
 * Methods
 */
postSchema.method({});

/**
 * Statics
 */
postSchema.statics.checkIsValid = function (post) {
  if (post) return post;
  throw new APIError({
    status: httpStatus.NOT_FOUND,
    message: 'Post not found',
  });
};

module.exports = mongoose.model('Post', postSchema);
