const Joi = require('joi');

const ERROR_MISSING_FIELDS = '400|Some required fields are missing';
const ERROR_NAME_LENGTH = '400|"displayName" length must be at least 8 characters long';
const ERROR_EMAIL = '400|"email" must be a valid email';
const ERROR_PASSWORD = '400|"password" length must be at least 6 characters long';

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

// const validateLogin = ({ email, password }) => {
//   if (!email || email === '') {
//     return { code: 400, message: 'Some required fields are missing' };
//   }
//   if (!password || password === '') {
//     return { code: 400, message: 'Some required fields are missing' };
//   }
//   return true;
// };

module.exports = {
  validateLogin,
  validateCreate,
};