//importando blibiotecas de rotas e verificações
const { Router } = require("express");
const User = require("./app/models/User");
//inicia o routes para o express no servidor
const routes = new Router(); 

//rota primaira
routes.get('/', async (req, res) => {
  return res.json('sss')
});

routes.get('/create-User', async (req, res) => {
  const user = await User.create({
    name: 'sssaaaa',
    email: 'taaaesste@teste.com',
    password_hash: '30303030',
    whatsapp: '77900000000'
  });

  return res.json(user);
});

//exporta as rotas
module.exports = routes;