const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/vars');

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
    config.token.secretKey,
    { expiresIn: config.token.expiresIn },
  );

  return token;
};

userSchema.methods.comparePassword = async function (password) {
  const isEqualPassword = await bcrypt.compare(password, this.password);
  return isEqualPassword;
};

// Static methods
userSchema.statics.checkIsExists = async function (username) {
  const user = await this.findOne({ username });
  return !!user;
};

userSchema.statics.hashPassword = async function (password) {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

module.exports = mongoose.model('User', userSchema);
