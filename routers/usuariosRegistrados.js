var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOUser= Factorydao.DaoUser();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
  router.get("/usuarios", function (request, response) {
    DAOUser.getUsuarios(function buscarNombre(err, result) {
      if (err) {
        console.log(err.message);
      } else if (result) {
        var usuarios = result;
        response.render("usuariosRegistrados", {
        nombre: request.session.nombre,
         usuarios: usuarios, 
        });
      }
    })
  });
  router.get("/BuscarUsuario", function (request, response) {
    DAOUser.getUsuarios_filtro(request.query.filtro,function buscarNombre(err, result) {
      if (err) {
        console.log(err.message);
      } else if (result) {
        var usuarios = result;
        response.render("usuariosRegistrados", {
        nombre: request.session.nombre,
         usuarios: usuarios, 
        });
      }
    })
  });

module.exports = router;
