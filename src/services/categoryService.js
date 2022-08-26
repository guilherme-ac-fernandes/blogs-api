const { Category } = require('../database/models');
const { validateCategory } = require('./helpers/validations');

module.exports = {
  create: async ({ name }) => {
    const validation = validateCategory({ name });
    if (validation.code) return validation;
    const { dataValues } = await Category.create({ name });
    return { code: 201, data: dataValues };
  },
};