const { User } = require('../database/models');
const createToken = require('./helpers_services/createToken');
const { validateCreate } = require('./helpers_services/validations');
const {
  CREATED,
  SUCESS,
  NOT_FOUND,
  NO_CONTENT,
  CONFLICT,
} = require('./helpers_services/constants');

module.exports = {
  create: async ({ displayName, email, password, image }) => {
    const validation = validateCreate({ displayName, email, password });
    if (validation.code) return validation;
    const user = await User.findOne({ where: { email } });
    if (user) return { code: CONFLICT, message: 'User already registered' };
    await User.create({ displayName, email, password, image });
    const token = createToken(email);
    return { code: CREATED, data: token };
  },

  getAll: async () => {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });
    if (!users) return { code: NOT_FOUND, message: 'Users not found' };
    return { code: SUCESS, data: users };
  },

  findById: async (id) => {
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });
    if (!user) return { code: NOT_FOUND, message: 'User does not exist' };
    return { code: SUCESS, data: user };
  },

  delete: async (userId) => {
    await User.destroy({ where: { id: userId } });
    return { code: NO_CONTENT };
  },
};
