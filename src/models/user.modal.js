const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.checkIsExists = async function (username) {
  const user = await this.findOne({ username });

  if (user) {
    throw new APIError({
      message: 'User already exists!',
      status: httpStatus.UNPROCESSABLE_ENTITY,
    });
  }
};

module.exports = mongoose.model('User', userSchema);
