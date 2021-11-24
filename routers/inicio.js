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
    var preguntas= new Array();
    DAOP.getPreguntas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
      else{
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
    })
  });

  router.get("/filtrarVisitas", function (request, response) {
    var preguntas= new Array();
    DAOP.filtrarVisitas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
      else{
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
    })
  });

  
  router.get("/filtrarFecha", function (request, response) {
    var preguntas= new Array();
    DAOP.filtrarFecha(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
      else{
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
    })
  });
  
  
  router.get("/desconectarse", function (request, response) {
    request.session.identificado=false;
    response.redirect("/login");

  });

  router.get("/BuscarEtiqueta", function (request, response) {
    var preguntas= new Array();
    var tag= request.query.tag;
    DAOP.getPreguntas_por_etiqueta(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
      else{
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
    })
  });
  router.get("/BuscarTexto", function (request, response) {
    var preguntas= new Array();
    var tag= request.query.tag;
    DAOP.getPreguntas_por_texto(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
      else{
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
        });
      }
    })
  });
module.exports = router;
