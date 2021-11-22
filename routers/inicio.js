var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOP= Factorydao.DAOPreguntas();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/", function (request, response) {
    response.redirect("/inicio");
  });

  router.get("/inicio", function (request, response) {
    DAOP.getPreguntas(function buscarNombre(err, result) {
      if (err) {
        console.log(err.message);
      } else if (result) {
        var preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          preguntas: preguntas, 
        });
      }
    })
  });

  router.get("/SinResponder", function (request, response) {
    DAOP.getPreguntas(function buscarNombre(err, result) {
      if (err) {
        console.log(err.message);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            console.log(err.message);
          } else if (result) {
            var respuestas = result;
            var Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              preguntas: Lista, 
            });
          }
        })
      }
    })
  });

  router.get("/desconectarse", function (request, response) {
    request.session.identificado=false;
    response.redirect("/login");

  });


  function Sinresponder(preguntas,respuestas) {
    var ListaFinal= new Array();
    var combinado= new Array();
    preguntas.forEach(pregunta => {
      var Pregunta= new Object();
      var listaP= new Array();
      respuestas.forEach(respuesta => {
        if(pregunta.id==respuesta.idPregunta){
          listaP.push(respuesta);
        }
      });
      Pregunta.pregunta=pregunta;
      Pregunta.respuestas=listaP;
      combinado.push(Pregunta);
    });
    combinado.forEach(combinado => {
      if(combinado.respuestas.length===0){
        ListaFinal.push(combinado.pregunta);
      }
    });
    return ListaFinal;
  }
module.exports = router;
