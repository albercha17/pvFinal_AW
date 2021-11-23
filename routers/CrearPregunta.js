var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
let Factorydao = new FactoryDao();
var DAOP= Factorydao.DAOPreguntas();

var error=null;
var Etiquetas= new Array();
//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
  router.get("/FormularPregunta", function (request, response) {
    response.render("crearPregunta", {
        nombre: request.session.nombre,
        error: error,
      });
  });
  router.get("/CrearPregunta", function (request, response) {
      var validarD= validarDatos(request.query.titulo,request.query.cuerpo);
      var validarEiquetas=validarEiqueta(request.query.etiquetas);
      if(!validarD || !validarEiquetas){
        response.render("crearPregunta", {
            nombre: request.session.nombre,
            error:error,
          });
          error=null;
          Etiquetas= new Array();
      }
      else{
        var etiquetas= new Array();
        etiquetas.push(request.query.etiquetas);
        DAOP.insertPregunta(request.session.email,request.query.titulo,request.query.cuerpo,Etiquetas,function buscarNombre(err, result) {
          if (err) {
            console.log(err.message);
          } else if (result) {
              response.redirect("/");
              error=null;
              Etiquetas= new Array();
          }
      });
      }
      
  });

  function validarDatos(titulo, cuerpo) {
    var valido = false;
    if (titulo.length<10) {
      error= "El título tiene que tener por lo menos 10 caracteres";
    } 
    else if (cuerpo.length<20){
        error= "El cuerpo tiene que tener por lo menos 20 caracteres";
    }
    else valido=true;
    return valido;
  }
  
  function validarEiqueta(etiqueta){
    if(etiqueta.startsWith('@')){
        Etiquetas = etiqueta.split("@");
        var i = Etiquetas.indexOf("");
        Etiquetas.splice( i, 1 );
        return true;
    }
    else{
        error= "El formato del tag es invalido. Empieza y separa cada tag con un @";
        return false;
    } 
  }
module.exports = router;
