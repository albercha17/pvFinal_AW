var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
const DAOP= FactoryDao.getDaoPregunta();

var filtroE =null;
var filtroC =null;

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/", function (request, response) {
    response.redirect("/inicio");
  });

  router.get("/inicio", function (request, response) {
    var preguntas= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.getPreguntas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
      else{
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
    })
  });

  router.get("/filtrarVisitas", function (request, response) {
    var preguntas= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.filtrarVisitas(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
      else{
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
    })
  });

  
  router.get("/filtrarFecha", function (request, response) {
    var preguntas= new Array();
    filtroE =null;
    filtroC =null;
    DAOP.filtrarFecha(function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
      else{
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
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
    filtroE =tag;
    filtroC =null;
    DAOP.getPreguntas_por_etiqueta(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
      else{
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
    })
  });
  router.get("/BuscarTexto", function (request, response) {
    var preguntas= new Array();
    var tag= request.query.tag;
    filtroE =null;
    filtroC =tag;
    DAOP.getPreguntas_por_texto(tag,function buscarNombre(err, result) {
      if (err) {
        response.status(500);
      } else if (result) {
        preguntas = result;
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
      else{
        response.status(200);
        response.render("inicio", {
          nombre: request.session.nombre,
          email:request.session.email,
          preguntas: preguntas, 
          filtroE : filtroE,
          filtroC : filtroC,
        });
      }
    })
  });
module.exports = router;
