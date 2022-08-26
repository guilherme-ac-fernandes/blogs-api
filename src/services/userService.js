const { User } = require('../database/models');
const createToken = require('./createToken');
const { validateLogin, validateCreate } = require('./validations');

module.exports = {
  login: async ({ email, password }) => {
    const validation = validateLogin({ email, password });
    if (validation.code) return validation;
    const user = await User.findOne({ where: { email } });
    if (!user) return { code: 400, message: 'Invalid fields' };
    if (user.dataValues.password !== password) return { code: 400, message: 'Invalid fields' };
    const token = createToken(email);
    return { code: 200, data: token };
  },
  create: async ({ displayName, email, password, image }) => {
    const validation = validateCreate({ displayName, email, password });
    if (validation.code) return validation;

    const user = await User.findOne({ where: { email } });
    if (user) return { code: 409, message: 'User already registered' };

    await User.create({ displayName, email, password, image });
    const token = createToken(email);
    return { code: 201, data: token };
  },
  getAll: async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    if (!users) return { code: 404, message: 'Users not found' };
    return { code: 200, data: users };
  },
};
