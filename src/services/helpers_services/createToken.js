require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

module.exports = (email) => {
  const jwtConfig = { expiresIn: '1d', algorithm: 'HS256' };
  const token = jwt.sign({ email }, JWT_SECRET, jwtConfig);
  return token;
};
