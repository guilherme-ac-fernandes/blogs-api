const { Category } = require('../database/models');
const { validateCategory } = require('./helpers_services/validations');

module.exports = {
  create: async ({ name }) => {
    const validation = validateCategory({ name });
    if (validation.code) return validation;
    const { dataValues } = await Category.create({ name });
    return { code: 201, data: dataValues };
  },

  getAll: async () => {
    const categories = await Category.findAll();
    if (!categories) return { code: 404, message: 'Categories not found' };
    return { code: 200, data: categories };
  },
};