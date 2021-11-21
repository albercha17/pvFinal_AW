"use strict";
const config = require("../JS/config");
const mysql = require("mysql");
const DAOUsers = require("../JS/DAOUsers");
const DAOPreguntas = require("../JS/DAOPreguntas");
// Crear el pool de conexiones
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});


class FactoriaDao {
    constructor() {
        this.daoUser = new DAOUsers(pool);
        this.DAOP = new DAOPreguntas(pool);
    }
     DaoUser() {
        return this.daoUser;
    }
    DAOPreguntas(){
        return this.DAOP;
    }
}
module.exports = FactoriaDao