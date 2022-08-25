require('dotenv').config();
const app = require('./api');

const port = process.env.API_PORT || 3000;

// Endpoint para validação dos Testes
app.get('/', (_request, response) => {
  response.send();
});

app.listen(port, () => console.log(`Ouvindo na porta ${port}...`));
