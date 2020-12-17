const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../.env') });

module.exports = {
  token: {
    secretKey: process.env.TOKEN_SECRET_KEY,
    expiresIn: process.env.TOKEN_EXPIRES_IN,
  },
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongo: {
    uri: process.env.MONGO_URI,
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  morganLogFormat: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
