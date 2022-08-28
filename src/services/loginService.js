const { User } = require('../database/models');
const createToken = require('./helpers_services/createToken');
const { validateLogin } = require('./helpers_services/validations');
const { SUCESS, BAD_REQUEST } = require('./helpers_services/codes');

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