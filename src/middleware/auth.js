require('dotenv').config();
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const { userService } = require('../services');
const { UNAUTHORIZED } = require('../services/helpers/codes');

// Middleware de autentificação proveniente da resolução do exercício
// presente no course da trybe (referente ao dia 24.3)
// Baseado na resolução do Aluno autor deste projeto (Guilherme Fernandes)
// source: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/03-back-end/bloco-24-node.js-orm-e-autentificacao/dia-04-testando-apis-com-testes-de-integracao/auth/validateJWT.js
module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    const { email } = jwt.verify(token, JWT_SECRET);
    const { code, data, message } = await userService.findByEmail(email);
    if (message) return res.status(code).json({ message });
    req.user = { displayName: data.displayName, userId: data.id };
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};