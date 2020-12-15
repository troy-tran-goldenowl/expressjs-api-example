const bcrypt = require('bcryptjs');
const User = require('../models/user.modal');
const { userSerializer } = require('../serializers/user.serializer');

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
