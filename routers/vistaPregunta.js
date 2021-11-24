
var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOPregunta= Factorydao.DAOPreguntas();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
  router.get("/pregunta/:id", function (request, response) {
          DAOPregunta.visitaPregunta(request.params.id,function buscarNombre(err, result) {
            if (err) {
              response.status(500);
            } else if (result){
              DAOPregunta.getPreguntasId(request.params.id,function buscarNombre(err, result) {
                if (err) {
                  response.status(500);
                } else if (result){
                  var preguntas = result;
                  var pregunta=preguntas[0];
                  response.status(200);
                response.render("vistaPregunta", {
                nombre: request.session.nombre,
                email: request.session.email,
    
                pregunta:pregunta,
              });
            }
          });
        }
      })    
  });
module.exports = router;
