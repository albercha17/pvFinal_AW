
var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOPregunta= Factorydao.DAOPreguntas();


var votadoN= null;
var votado= null;
//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/preguntaInfo/:id", function (request, response) {
  DAOPregunta.getPreguntasId(request.params.id, function buscarNombre(err, result) {
    if (err) {
      response.status(500);
    } else if (result) {
      var preguntas = result;
      var pregunta = preguntas[0];
      DAOPregunta.getRespuestaId(pregunta.id, function buscarNombre(err, result) {
        if (err) {
          response.status(500);
        } else if (result) {
          var respuestas = result;
          response.status(200);
          response.render("vistaPregunta", {
            nombre: request.session.nombre,
            email: request.session.email,
            pregunta: pregunta,
            respuestas: respuestas,
            votadoN : votadoN,
            votado : votado,
          });
          votadoN= null;
          votado= null;
        }
      });
    }
  });
});
  router.get("/pregunta/:id", function (request, response) {
          DAOPregunta.visitaPregunta(request.params.id,function buscarNombre(err, result) {
            if (err) {
              response.status(500);
            } else if (result){
              response.redirect("/preguntaInfo/"+request.params.id)
        }
      });    
  });


router.get("/PuntuarPregunta/:id", function (request, response) {
      DAOPregunta.getPuntuado(request.session.email, request.params.id, 0, request.query.puntos, function buscarNombre(err, result) {
        if (err) {
          response.status(500);
        } else if (result=="Insertar") {
            DAOPregunta.puntuarPregunta(request.params.id, request.query.puntos, function buscarNombre(err, result) {
              if (err) {
                response.status(500);
              } else if (result) {
                response.redirect("/preguntaInfo/" + request.params.id)
              }
            });
        }
        else if (result=="Update") {
          var puntos=request.query.puntos*2;
          DAOPregunta.puntuarPregunta(request.params.id, puntos, function buscarNombre(err, result) {
            if (err) {
              response.status(500);
            } else if (result) {
              response.redirect("/preguntaInfo/" + request.params.id)
            }
          });
      }
        else{
          var puntos=request.query.puntos;
          if(puntos>0){votado=1;}
          else{votadoN=1;} 
            response.redirect("/preguntaInfo/" + request.params.id)
          }
        });
      });
 
router.get("/PuntuarRespuesta/:id", function (request, response) {
  DAOPregunta.puntuarRespuesta(request.params.id, request.query.id, request.query.puntos, function buscarNombre(err, result) {
    if (err) {
      response.status(500);
    }  else if (result){
      response.redirect("/preguntaInfo/"+request.params.id)
}
});    
});

  router.get("/CrearRespuesta/:id",function (request, response) {
    DAOPregunta.insertRespuesta(request.params.id,request.query.texto,request.session.email,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result){
        response.status(200);
        response.redirect("/preguntaInfo/"+request.params.id)
      }
    })  
});
module.exports = router;
