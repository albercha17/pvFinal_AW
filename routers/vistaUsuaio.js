
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
  router.get("/usuario/:email", function (request, response) {
    DAOUser.getUserName(request.params.email,function buscarNombre(err, result) {
        if (err) {
            response.status(500);
        } else if (result){
          var usuario = result;
          response.status(200);
          response.render("vistaUsuario", {
            nombre: request.session.nombre,
            email: request.session.email,
            usuario:usuario,
          });
        }
      })    
  });
module.exports = router;
