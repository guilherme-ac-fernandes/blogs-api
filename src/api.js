const express = require('express');

const app = express();

app.use(express.json());

// Routers e Middleware
const {
  loginRoute,
  categoryRoute,
  postRoute,
  userRoute,
} = require('./routers');
const Middleware = require('./middleware');

// Rotas
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);

// Middleware de Erro Genérico
app.use(Middleware.error);

module.exports = app;
