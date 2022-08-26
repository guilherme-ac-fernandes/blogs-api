const express = require('express');

const app = express();

// Importações de Controllers e Middlewares
const {
  userController,
  categoryController,
  postController,
} = require('./controllers');
const Middlewares = require('./middleware');

app.use(express.json());

// UserController
app.post('/login', userController.login);
app.post('/user', userController.create);
app.get('/user', Middlewares.auth, userController.getAll);
app.get('/user/:id', Middlewares.auth, userController.findById);

// CategoryController
app.post('/categories', Middlewares.auth, categoryController.create);
app.get('/categories', Middlewares.auth, categoryController.getAll);

// PostController
app.post('/post', Middlewares.auth, postController.create);
app.get('/post', Middlewares.auth, postController.getAll);
app.get('/post/:id', Middlewares.auth, postController.findById);
app.put('/post/:id', Middlewares.auth, postController.update);
app.delete('/post/:id', Middlewares.auth, postController.delete);

// Middleware de Erro Genérico
app.use(Middlewares.error);

module.exports = app;
