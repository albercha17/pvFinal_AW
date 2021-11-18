"use strict";
const config = require("../JS/config");
const mysql = require("mysql");
const DAOUsers = require("../JS/DAOUsers");
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
    }
     DaoUser() {
        return this.daoUser;
    }
}
module.exports = FactoriaDao