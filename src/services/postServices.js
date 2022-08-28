const Sequelize = require('sequelize');
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
} = require('./helpers_services/validations');
const {
  CREATED,
  SUCESS,
  BAD_REQUEST,
  NOT_FOUND,
  NO_CONTENT,
} = require('./helpers_services/constants');

const { Op } = Sequelize;

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
        return { code: BAD_REQUEST, message: '"categoryIds" not found' };
      }
      const { dataValues } = await BlogPost.create(
        { title, content, userId },
        { transaction },
      );
      const postsCategories = categoryIds.map((number) => ({
        postId: dataValues.id, categoryId: number,
      }));
      await PostCategory.bulkCreate(postsCategories, { transaction });
      return { code: CREATED, data: dataValues };
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
          through: { attributes: [] },
        },
      ],
    });
    if (!posts) return { code: NOT_FOUND, message: 'Posts not found' };
    return { code: SUCESS, data: posts };
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
          through: { attributes: [] },
        },
      ],
    });
    if (!post) return { code: NOT_FOUND, message: 'Post does not exist' };
    return { code: SUCESS, data: post };
  },

  update: async (id, userId, { title, content }) => {
    const validation = validatePostUpdate({ title, content });
    if (validation.code) return validation;
    const validationUser = await validateUser(id, userId);
    if (validationUser.code) return validationUser;
    await BlogPost.update({ title, content }, { where: { id } });
    const { dataValues } = await BlogPost.findByPk(id, { include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
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
      include: 
      [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });
    if (!posts) return { code: NOT_FOUND, message: 'AQUI' };
    return { code: SUCESS, data: posts };
  },
};
