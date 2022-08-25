// const Joi = require('joi');

// const loginSchema = Joi.object({
//   email: Joi.string().email().required().messages({
//     'string.empty': '400|Some required fields are missing',
//     'string.email': '400|Invalid fields',
//     'any.required': '400|Some required fields are missing',
//   }),
//   password: Joi.string().min(2).required().messages({
//     'string.empty': '400|Some required fields are missing',
//     'string.min': '400|Invalid fields',
//     'any.required': '400|Some required fields are missing',
//   }),
// });

// const validateLogin = (object) => {
//   const { error } = loginSchema.validate(object);
//   if (error !== undefined) {
//     const [code, message] = error.message.split('|');
//     return { code: Number(code), message };
//   }
//   return true;
// };

const validateLogin = ({ email, password }) => {
  if (!email || email === '') {
    return { code: 400, message: 'Some required fields are missing' };
  }
  if (!password || password === '') {
    return { code: 400, message: 'Some required fields are missing' };
  }
  return true;
};

module.exports = {
  validateLogin,
};