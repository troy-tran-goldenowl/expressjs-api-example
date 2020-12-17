const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');

module.exports = (req, res, next) => {
  try {
    const headerAuthorization = req.get('Authorization');
    if (!headerAuthorization) {
      throw new APIError({
        message: 'Not authentication',
        status: httpStatus.UNAUTHORIZED,
      });
    }

    const headerToken = headerAuthorization.split(' ')[1];
    const decodedToken = jwt.verify(headerToken, process.env.TOKEN_SECRET_KEY);

    if (!decodedToken) {
      throw new APIError({
        message: 'Not authentication',
        status: httpStatus.UNAUTHORIZED,
      });
    }

    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    next(error);
  }
};
