# Blogs API 📦

Consiste em uma API e um banco de dados para produção de conteúdo para um blog. 

* Contruída com Node.js, Express, Sequeliza com MySQL e Docker
* Utilizando as práticas do REST
* Aplicada Arquitetura de Software, com as camadas de Modelo, Serviço e de Controladores


### Instruções

- Para rodar o repositório localmente, realize o clone do projeto e utilize os comandos a seguir para inicializar o Docker:

```
npm run prestart // para criar o banco de dados e as migrações
npm run seed // para popular o banco de dados
docker-compose up -d --build
docker attach store_manager
npm install // para instalar as dependências
npm start // 
```

E utilize os comandos a seguir para executar a aplicação:

```
npm start // para iniciar a aplicação
ou
npm run debug // para iniciar a aplicação em ambiente de desevilvimento
```

### Endpoints

#### Login

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Realiza login do usuário e retorna o token | http://localhost:3000/login |

Nessa requisição é necessário informar o seguinte JSON:

```
{
  "email": "email-cadastrado-no-banco-de-dados@email.com",
  "password": "123456"
}
```

#### User

| Método | Funcionalidade | URL |
|---|---|---|
| `POST` | Criar um novo usuário e retorna o token | http://localhost:3000/user |
| `GET` | Retorno os dados não sensíveis de todos os usuário | http://localhost:3000/user |
| `GET` | Retorno os dados não sensíveis de um usuário específico | http://localhost:3000/user/:id |
| `DELETE` | Deleta os dados do usuário através da informação do token | http://localhost:3000/user/me |


Na requisição POST, é necessário informar a os dados o usuário no formato a seguir:

```
{
  "displayName": "Usuário Exemplo",
  "email": "usuario-exemplo@email.com",
  "password": "123456",
  "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
}
```




