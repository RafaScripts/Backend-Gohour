//importação das bibliotecas

const express = require("express");
const routes = require("./routes");


require("./Database/index");

//inicia o express
class App {
    constructor() {
        this.server = express();

        this.middlewares();
        this.routes(); 
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

module.exports = new App().server;

