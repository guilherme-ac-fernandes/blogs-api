const { User } = require('../database/models');
const createToken = require('./helpers_services/createToken');
const { validateCreate } = require('./helpers_services/validations');

module.exports = {
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

  findById: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return { code: 404, message: 'User does not exist' };
    return { code: 200, data: user };
  },

  delete: async (userId) => {
    await User.destroy({ where: { id: userId } });
    return { code: 204 };
  },
};
