//importando blibiotecas de rotas e verificações
const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

//inicia o routes para o express no servidor
const routes = express.Router();

//rota primaira
routes.get('/', (req, res) => {
  return res.json("Hello World");
});

//exporta as rotas
module.exports = routes;