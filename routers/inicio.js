var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const {
  request
} = require("http");
const {
  response
} = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOP = Factorydao.DAOPreguntas();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/", function (request, response) {
  response.redirect("/inicio");
});

router.get("/inicio", function (request, response) {
  var ListaP = new Array();
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
          ListaP = combinar(preguntas, respuestas);
          response.render("inicio", {
            nombre: request.session.nombre,
            x: ListaP, // tengo .preguntas y .respuestas
          });
        }
      });
    }
  })
});

router.get("/desconectarse", function (request, response) {
  request.session.identificado = false;
  response.redirect("/login");
  response.end();
});




//------------funciones secundarias

function combinar(preguntas, respuestas) {
  var combinado = new Array();
  preguntas.forEach(pregunta => {
    var Pregunta = new Object();
    var listaP = new Array();
    respuestas.forEach(respuesta => {
      if (pregunta.id == respuesta.idPregunta) {
        listaP.push(respuesta);
      }
    });
    Pregunta.pregunta = pregunta;
    Pregunta.respuestas = listaP;
    combinado.push(Pregunta);
  });

  return combinado;
}
module.exports = router;
