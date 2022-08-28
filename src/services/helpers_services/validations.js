const { BlogPost } = require('../../database/models');
const { NOT_FOUND, UNAUTHORIZED } = require('./codes');
const {
  loginSchema,
  createSchema,
  categorySchema,
  postSchema,
  postUpdateSchema,
} = require('./schemasJoi');

// Função genérica para validações
const handleValidation = (schema, variable) => {
  const { error } = schema.validate(variable);
  if (error !== undefined) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }
  return true;
};

// Função de validação de usuário autorizado ou não
const validateUser = async (id, userId) => {
  const post = await BlogPost.findByPk(id);
  if (!post) return { code: NOT_FOUND, message: 'Post does not exist' };
  if (userId !== post.userId) return { code: UNAUTHORIZED, message: 'Unauthorized user' };
  return true;
};

// Funções de validação utilizando Joi
const validateLogin = (object) => handleValidation(loginSchema, object);
const validateCreate = (object) => handleValidation(createSchema, object);
const validateCategory = (object) => handleValidation(categorySchema, object);
const validatePost = (object) => handleValidation(postSchema, object);
const validatePostUpdate = (object) => handleValidation(postUpdateSchema, object);

module.exports = {
  validateLogin,
  validateCreate,
  validateCategory,
  validatePost,
  validatePostUpdate,
  validateUser,
};
