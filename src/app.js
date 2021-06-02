//importação das bibliotecas

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const { errors } = require("celebrate");

//inicia o express
const app = express();

//inicia todas as outras blibiotecas
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

//exporta o app.js
module.exports = app;