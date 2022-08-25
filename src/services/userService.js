const { User } = require('../database/models');
const createToken = require('./createToken');
const { validateLogin } = require('./validations');

module.exports = {
  create: async ({ email, password }) => {
    const validation = validateLogin({ email, password });
    if (validation.code) return validation;

    const user = await User.findOne({ where: { email } });
    if (!user) return { code: 400, message: 'Invalid fields' };
    if (user.dataValues.password !== password) return { code: 400, message: 'Invalid fields' };

    const token = createToken(email);
    return { token };
  },
};