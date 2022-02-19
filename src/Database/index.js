import mongoose from "mongoose";
const Sequelize = require("sequelize");

import databaseConfig from "../config/database";

import User from "../app/models/User";
import File from "../app/models/File";
import Appointment from "../app/models/Appointment";

const models = [User, File, Appointment];


class Database {
    constructor() {
        this.init();
        this.mongo();
    }


    init() {
        this.connection = new Sequelize(databaseConfig);

        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));

    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb://159.223.111.47:27017/agendaai'
        );
    }
}

export default new Database();
