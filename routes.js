const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const contatoController = require('./src/controllers/contatoController');
const middleware = require('./src/middlewares/middleware');

// Rotas da home
 route.get('/', middleware.autenticacao, homeController.index);

// Rotas do login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/entrar', loginController.entrar);
route.get('/login/sair', loginController.sair);

// Rota contato
route.get('/contato/index', middleware.autenticacao, contatoController.index);
route.post('/contato/register', middleware.autenticacao, contatoController.register);

module.exports = route;
