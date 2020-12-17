const httpStatus = require('http-status');
const User = require('../models/user.model');
const { userAuthSerializer, userSerializer } = require('../serializers/user.serializer');
const APIError = require('../utils/APIError');

exports.signup = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const isUserAlreadyExists = await User.checkIsExists(username);

    if (isUserAlreadyExists) {
      throw new APIError({
        message: 'User already exists!',
        status: httpStatus.UNPROCESSABLE_ENTITY,
      });
    }

    const hashedPassword = await User.hashPassword(password);
    const newUser = await new User({ username, password: hashedPassword }).save();

    res.status(httpStatus.CREATED).json({ user: userSerializer(newUser) });
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
        message: 'Invalid username or password',
        status: httpStatus.NOT_FOUND,
      });
    }

    const isEqualPassword = await user.comparePassword(password);
    if (!isEqualPassword) {
      throw new APIError({
        message: 'Invalid username or password',
        status: httpStatus.NOT_FOUND,
      });
    }

    const token = user.generateToken();

    res.json({ user: userAuthSerializer(user, token) });
  } catch (error) {
    next(error);
  }
};
