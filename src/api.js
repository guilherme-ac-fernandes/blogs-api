const express = require('express');

// Routers e Middleware
const {
  loginRoute,
  categoryRoute,
  postRoute,
  userRoute,
} = require('./routers');
const Middleware = require('./middleware');

const app = express();

app.use(express.json());

// Rotas
app.use('/login', loginRoute);
app.use('/user', userRoute);
app.use('/categories', categoryRoute);
app.use('/post', postRoute);

// Middleware de Erro Genérico
app.use(Middleware.error);

module.exports = app;
