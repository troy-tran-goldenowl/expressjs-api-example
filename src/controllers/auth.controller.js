const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const User = require('../models/user.modal');
const { userSerializer } = require('../serializers/user.serializer');
const APIError = require('../utils/APIError');

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    await User.checkIsExists(username);

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await new User({ username, password: hashedPassword }).save();

    res.json({ user: userSerializer(newUser) });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      throw new APIError({
        message: 'User not found',
        status: httpStatus.NOT_FOUND,
      });
    }

    const isEqualPassword = await bcrypt.compare(password, user.password);
    if (!isEqualPassword) {
      throw new APIError({
        message: 'Wrong password!',
        status: httpStatus.NOT_FOUND,
      });
    }

    const token = user.generateToken();

    res.json({ user: userSerializer(user), token });
  } catch (error) {
    next(error);
  }
};
