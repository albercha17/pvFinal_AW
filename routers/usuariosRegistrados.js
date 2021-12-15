var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
const DAOUser= FactoryDao.getDaoUsers();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
  router.get("/usuarios", function (request, response) {
    DAOUser.getUsuarios(function buscarUsers(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var usuarios = result;
        response.status(200);
        response.render("usuariosRegistrados", {
        nombre: request.session.nombre,
        email:request.session.email,
        img:request.session.img,
         usuarios: usuarios, 
        });
      }
    })
  });
  router.get("/BuscarUsuario", function (request, response) {
    DAOUser.getUsuarios_filtro(request.query.filtro,function filtrarU(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var usuarios = result;
        response.status(200);
        response.render("usuariosRegistrados", {
        nombre: request.session.nombre,
        img:request.session.img,
        email:request.session.email,
         usuarios: usuarios, 
        });
      }
    })
  });

module.exports = router;
