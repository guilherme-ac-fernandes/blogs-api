const Sequelize = require('sequelize');

const { Op } = Sequelize;

const {
  User,
  BlogPost,
  Category,
  PostCategory,
  sequelize,
} = require('../database/models');
const {
  validatePost,
  validatePostUpdate,
  validateUser,
  validateCategories,
} = require('./helpers/validations');
const {
  CREATED,
  SUCESS,
  NOT_FOUND,
  NO_CONTENT,
} = require('./helpers/codes');

// Array padrão de includes das tabelas de junção
// Utilização de múltiplos include em uma tabela proveniente do StackOverFlow
// source: https://stackoverflow.com/questions/25880539/join-across-multiple-junction-tables-with-sequelize
const ARRAY_INCLUDES = [
  { model: User, as: 'user', attributes: { exclude: ['password'] } },
  { model: Category, as: 'categories', through: { attributes: [] } },
];

module.exports = {
  // Resolução da aplicação de inserção em duas tabelas utilizando
  // transaction proveniente da mentoria Summer da Luá Octaviano
  // source: https://github.com/luacomacento/friends-api/blob/friends-dev/src/services/characters.js
  create: async (userId, { title, content, categoryIds }) => {
    const validation = validatePost({ title, content, categoryIds });
    if (validation.code) return validation;
    const validationCategories = await validateCategories(categoryIds);
    if (validationCategories.code) return validationCategories;
    const { data, code, message } = await sequelize.transaction(async (transaction) => {
      const { dataValues } = await BlogPost.create({ title, content, userId }, { transaction });
      const postsCategories = categoryIds.map((number) => ({
        postId: dataValues.id, categoryId: number,
      }));
      await PostCategory.bulkCreate(postsCategories, { transaction });
      return { code: CREATED, data: dataValues };
    });
    return { data, code, message };
  },

  getAll: async () => {
    const posts = await BlogPost.findAll({ include: ARRAY_INCLUDES });
    if (!posts) return { code: NOT_FOUND, message: 'Posts not found' };
    return { code: SUCESS, data: posts };
  },

  findById: async (id) => {
    const post = await BlogPost.findByPk(id, { include: ARRAY_INCLUDES });
    if (!post) return { code: NOT_FOUND, message: 'Post does not exist' };
    return { code: SUCESS, data: post };
  },

  update: async (id, userId, { title, content }) => {
    const validation = validatePostUpdate({ title, content });
    if (validation.code) return validation;
    const validationUser = await validateUser(id, userId);
    if (validationUser.code) return validationUser;
    await BlogPost.update({ title, content }, { where: { id } });
    const { dataValues } = await BlogPost.findByPk(id, { include: ARRAY_INCLUDES });
    return { code: SUCESS, data: dataValues };
  },

  delete: async (id, userId) => {
    const validationUser = await validateUser(id, userId);
    if (validationUser.code) return validationUser;
    await BlogPost.destroy({ where: { id } });
    return { code: NO_CONTENT };
  },

  // Utilização do Op.or para aplicação de mais de uma opção no where proveniente do Grepper
  // source: https://www.codegrepper.com/code-examples/javascript/sequelize+like+query
  // Juntamente com a utilização do Op.like para implementar a opção like do sql proveniente do StackOverFlow
  // source: https://stackoverflow.com/questions/53971268/node-sequelize-find-where-like-wildcard 
  search: async (search) => {
    const posts = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${search}%` } },
          { content: { [Op.like]: `%${search}%` } },
        ],
      },
      include: ARRAY_INCLUDES,
    });
    return { code: SUCESS, data: posts };
  },
};
