const Joi = require('joi');

const ERROR_MISSING_FIELDS = '400|Some required fields are missing';
const ERROR_NAME_LENGTH = '400|"displayName" length must be at least 8 characters long';
const ERROR_EMAIL = '400|"email" must be a valid email';
const ERROR_PASSWORD = '400|"password" length must be at least 6 characters long';
const ERROR_CATEGORY = '400|"name" is required';

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.empty': ERROR_MISSING_FIELDS,
    'any.required': ERROR_MISSING_FIELDS,
  }),
  password: Joi.string().required().messages({
    'string.empty': ERROR_MISSING_FIELDS,
    'any.required': ERROR_MISSING_FIELDS,
  }),
});

const createSchema = Joi.object({
  displayName: Joi.string().min(8).required().messages({
    'string.empty': ERROR_NAME_LENGTH,
    'string.min': ERROR_NAME_LENGTH,
    'any.required': ERROR_NAME_LENGTH,
  }),
  email: Joi.string().email().required().messages({
    'string.empty': ERROR_EMAIL,
    'string.email': ERROR_EMAIL,
    'any.required': ERROR_EMAIL,
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': ERROR_PASSWORD,
    'string.min': ERROR_PASSWORD,
    'any.required': ERROR_PASSWORD,
  }),
});

const categorySchema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': ERROR_CATEGORY,
    'any.required': ERROR_CATEGORY,
  }),
});

const postSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': ERROR_MISSING_FIELDS,
    'any.required': ERROR_MISSING_FIELDS,
  }),
  content: Joi.string().required().messages({
    'string.empty': ERROR_MISSING_FIELDS,
    'any.required': ERROR_MISSING_FIELDS,
  }),
  categoryIds: Joi.array().required().messages({
    'string.empty': ERROR_MISSING_FIELDS,
    'any.required': ERROR_MISSING_FIELDS,
  }),
});

// Função genérica para validações
const handleCallback = (schema, variable) => {
  const { error } = schema.validate(variable);
  if (error !== undefined) {
    const [code, message] = error.message.split('|');
    return { code: Number(code), message };
  }
  return true;
};

const validateLogin = (object) => handleCallback(loginSchema, object);
const validateCreate = (object) => handleCallback(createSchema, object);
const validateCategory = (object) => handleCallback(categorySchema, object);
const validatePost = (object) => handleCallback(postSchema, object);

module.exports = {
  validateLogin,
  validateCreate,
  validateCategory,
  validatePost,
};
