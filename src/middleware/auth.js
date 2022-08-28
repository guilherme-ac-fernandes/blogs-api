require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../database/models');
const { UNAUTHORIZED } = require('../services/helpers_services/codes');

const { JWT_SECRET } = process.env;

// Middleware de autentificação proveniente da resolução do exercício
// presente no course da trybe (referente ao dia 24.3)
// Baseado na resolução do Aluno autor deste projeto (Guilherme Fernandes)
// source: https://github.com/guilherme-ac-fernandes/trybe-exercicios/blob/main/03-back-end/bloco-24-node.js-orm-e-autentificacao/dia-04-testando-apis-com-testes-de-integracao/auth/validateJWT.js
module.exports = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    if (!token) return res.status(UNAUTHORIZED).json({ message: 'Token not found' });
    const { email } = jwt.verify(token, JWT_SECRET);
    const { displayName, id } = await User.findOne({ where: { email } });
    req.user = { email, displayName, userId: id };
    next();
  } catch (err) {
    return res.status(UNAUTHORIZED).json({ message: 'Expired or invalid token' });
  }
};