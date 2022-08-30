const { User } = require('../database/models');
const createToken = require('./helpers/createToken');
const { validateLogin } = require('./helpers/validations');
const { SUCESS, BAD_REQUEST } = require('./helpers/codes');

module.exports = {
  login: async ({ email, password }) => {
    const validation = validateLogin({ email, password });
    if (validation.code) return validation;
    const user = await User.findOne({ where: { email } });
    if (!user) return { code: BAD_REQUEST, message: 'Invalid fields' };
    if (user.dataValues.password !== password) {
      return { code: BAD_REQUEST, message: 'Invalid fields' };
    }
    const token = createToken(email);
    return { code: SUCESS, data: token };
  },
};