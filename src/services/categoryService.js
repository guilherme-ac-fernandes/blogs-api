const { Category } = require('../database/models');
const { validateCategory } = require('./helpers_services/validations');
const { CREATED, SUCESS, NOT_FOUND } = require('./helpers_services/codes');

module.exports = {
  create: async ({ name }) => {
    const validation = validateCategory({ name });
    if (validation.code) return validation;
    const { dataValues } = await Category.create({ name });
    return { code: CREATED, data: dataValues };
  },

  getAll: async () => {
    const categories = await Category.findAll();
    if (!categories) {
      return { code: NOT_FOUND, message: 'Categories not found' };
    }
    return { code: SUCESS, data: categories };
  },
};