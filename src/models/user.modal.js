const mongoose = require('mongoose');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
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

userSchema.methods.generateToken = function () {
  const tokenData = { userId: this._id.toString(), username: this.username };
  const token = jwt.sign(
    tokenData,
    process.env.TOKEN_SECRET_KEY,
    { expiresIn: process.env.TOKEN_EXPIRES_IN },
  );

  return token;
};

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
