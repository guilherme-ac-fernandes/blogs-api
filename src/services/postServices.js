const { BlogPost, Category, PostCategory, sequelize } = require('../database/models');
const { validatePost } = require('./helpers/validations');

module.exports = {
  // Resolução da aplicação de inserção em duas tabelas utilizando
  // transaction proveniente da mentoria Summer da Luá Octaviano
  // source: https://github.com/luacomacento/friends-api/blob/friends-dev/src/services/characters.js
  create: async (userId, { title, content, categoryIds }) => {
    const validation = validatePost({ title, content, categoryIds });
    if (validation.code) return validation;
    const { data, code, message } = await sequelize.transaction(async (transaction) => {
      const { rows } = await Category.findAndCountAll({ where: { id: categoryIds } });
      if (rows.length < categoryIds.length) {
        return { code: 400, message: '"categoryIds" not found' };
      }
      const { dataValues } = await BlogPost.create(
        { title, content, userId },
        { transaction },
      );
      const postsCategories = categoryIds.map((number) => ({
        postId: dataValues.id, categoryId: number,
      }));
      await PostCategory.bulkCreate(postsCategories, { transaction });
      return { code: 201, data: dataValues };
    });
    return { data, code, message };
  },
};
