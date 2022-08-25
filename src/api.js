const express = require('express');

const app = express();

const { userController } = require('./controllers');
const Middlewares = require('./middleware');

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.create);

// Middleware de Erro Genérico
app.use(Middlewares.error);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
