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
var filtroE =null;
var filtroC =null;
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
  router.get("/SinResponder", function (request, response) {
    var Lista= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.getPreguntas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result) {
            var respuestas = result;
            response.status(200);
            Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              email:request.session.email,
              preguntas: Lista, 
              filtroE : filtroE,
          filtroC : filtroC,
            });
          }
          else{
            response.status(200);
            response.render("preguntasSinResponder", {
                nombre: request.session.nombre,
                email:request.session.email,
                preguntas: Lista, 
                filtroE : filtroE,
          filtroC : filtroC,
              });
          }
        })
      }
      else{
        response.status(200);
        response.render("preguntasSinResponder", {
            nombre: request.session.nombre,
            email:request.session.email,
            preguntas: Lista, 
            filtroE : filtroE,
          filtroC : filtroC,
          });
      }
    })
  });

  router.get("/filtrarVisitasSR", function (request, response) {
    var Lista= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.filtrarVisitas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result) {
            var respuestas = result;
            response.status(200);
            Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              email:request.session.email,
              preguntas: Lista, 
              
            });
          }
          else{
            response.status(200);
            response.render("preguntasSinResponder", {
                nombre: request.session.nombre,
                email:request.session.email,
                preguntas: Lista,
                filtroE : filtroE,
          filtroC : filtroC, 
              });
          }
        })
      }
      else{
        response.status(200);
        response.render("preguntasSinResponder", {
            nombre: request.session.nombre,
            email:request.session.email,
            preguntas: Lista, 
            filtroE : filtroE,
          filtroC : filtroC,
          });
      }
    })
  });

  router.get("/filtrarFechaSR", function (request, response) {
    var Lista= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.filtrarFecha(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result) {
            var respuestas = result;
            response.status(200);
            Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              email:request.session.email,
              preguntas: Lista, 
              filtroE : filtroE,
          filtroC : filtroC,
            });
          }
          else{
            response.status(200);
            response.render("preguntasSinResponder", {
                nombre: request.session.nombre,
                email:request.session.email,
                preguntas: Lista,
                filtroE : filtroE,
          filtroC : filtroC,
              });
          }
        })
      }
      else{
        response.status(200);
        response.render("preguntasSinResponder", {
            nombre: request.session.nombre,
            email:request.session.email,
            preguntas: Lista, 
            filtroE : filtroE,
          filtroC : filtroC,
          });
      }
    })
  });

  router.get("/BuscarEtiquetaSR", function (request, response) {
    var Lista= new Array();
    filtroE =request.query.tag;
    filtroC =null;
    var tag=request.query.tag;
    DAOP.getPreguntas_por_etiqueta(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result) {
            var respuestas = result;
            response.status(200);
            Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              email:request.session.email,
              preguntas: Lista, 
              filtroE : filtroE,
          filtroC : filtroC,
            });
          }
          else{
            response.status(200);
            response.render("preguntasSinResponder", {
                nombre: request.session.nombre,
                email:request.session.email,
                preguntas: Lista, 
                filtroE : filtroE,
          filtroC : filtroC,
              });
          }
        })
      }
      else{
        response.status(200);
        response.render("preguntasSinResponder", {
            nombre: request.session.nombre,
            email:request.session.email,
            preguntas: Lista, 
            filtroE : filtroE,
          filtroC : filtroC,
          });
      }
    })
  });

  router.get("/BuscarTextoSR", function (request, response) {
    var Lista= new Array();
    filtroE =null;
    filtroC =request.query.tag;
    var tag=request.query.tag;
    DAOP.getPreguntas_por_texto(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        var preguntas = result;
        DAOP.getRespuesta(function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result) {
            response.status(200);
            var respuestas = result;
             Lista=Sinresponder(preguntas,respuestas);
            response.render("preguntasSinResponder", {
              nombre: request.session.nombre,
              email:request.session.email,
              preguntas: Lista, 
              filtroE : filtroE,
          filtroC : filtroC,
            });
          }
          else{
            response.status(200);
            response.render("preguntasSinResponder", {
                nombre: request.session.nombre,
                email:request.session.email,
                preguntas: Lista, 
                filtroE : filtroE,
          filtroC : filtroC,
              });
          }
        })
      }
      else{
        response.status(200);
        response.render("preguntasSinResponder", {
            nombre: request.session.nombre,
            email:request.session.email,
            preguntas: Lista, 
            filtroE : filtroE,
          filtroC : filtroC,
          });
      }
    })
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
