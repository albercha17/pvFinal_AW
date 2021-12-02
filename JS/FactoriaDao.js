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


const daoUser= new DAOUsers(pool);
const daoPregunta= new DAOPreguntas(pool);

module.exports={
getDaoUsers: function getDaoUsers(){ return daoUser},
getDaoPregunta: function getDaoPregunta(){ return daoPregunta}
}