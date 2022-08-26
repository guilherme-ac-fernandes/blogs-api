const { User, BlogPost, Category, PostCategory, sequelize } = require('../database/models');
const { validatePost } = require('./helpers/validations');

module.exports = {
  // Resolução da aplicação de inserção em duas tabelas utilizando
  // transaction proveniente da mentoria Summer da Luá Octaviano
  // source: https://github.com/luacomacento/friends-api/blob/friends-dev/src/services/characters.js
  create: async (userId, { title, content, categoryIds }) => {
    const validation = validatePost({ title, content, categoryIds });
    if (validation.code) return validation;
    const { data, code, message } = await sequelize.transaction(async (transaction) => {
      const { count } = await Category.findAndCountAll({ where: { id: categoryIds } });
      if (count < categoryIds.length) {
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

  // Utilização de múltiplos include em uma tabela proveniente do StackOverFlow
  // source: https://stackoverflow.com/questions/25880539/join-across-multiple-junction-tables-with-sequelize
  getAll: async () => {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
        },
      ],
    });
    if (!posts) return { code: 404, message: 'Posts not found' };
    return { code: 200, data: posts };
  },

  findById: async (id) => {
    const post = await BlogPost.findByPk(id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        {
          model: Category,
          as: 'categories',
        },
      ],
    });
    if (!post) return { code: 404, message: 'Post does not exist' };
    return { code: 200, data: post };
  },
};
