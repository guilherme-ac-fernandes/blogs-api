const express = require('express');

const app = express();

// Importações de Controllers e Middlewares
const { userController } = require('./controllers');
const Middlewares = require('./middleware');

app.use(express.json());

app.post('/login', userController.login);
app.post('/user', userController.create);
app.get('/user', Middlewares.auth, userController.getAll);
app.get('/user/:id', Middlewares.auth, userController.findById);

// Middleware de Erro Genérico
app.use(Middlewares.error);

module.exports = app;
