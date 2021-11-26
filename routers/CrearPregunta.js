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
    response.status(200);
    response.render("crearPregunta", {
        nombre: request.session.nombre,
        email:request.session.email,
        error: error,
      });
  });
  router.get("/CrearPregunta", function (request, response) {
      var validarD= validarDatos(request.query.titulo,request.query.cuerpo);
      var validarEiquetas=validarEiqueta(request.query.etiquetas);
      if(!validarD || !validarEiquetas){
        response.status(200);
        response.render("crearPregunta", {
            nombre: request.session.nombre,
            email:request.session.email,
            error:error,
          });
          error=null;
          Etiquetas= new Array();
      }
      else{
        DAOP.insertPregunta(request.session.email,request.query.titulo,request.query.cuerpo,Etiquetas,function buscarNombre(err, result) {
          if (err) {
            response.status(500);
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
    if (titulo.length<10 ||titulo.length>100) {
      error= "El título tiene que tener por lo menos 10 caracteres y un maximo de 100";
    } 
    else if (cuerpo.length<20 || cuerpo.length>200){
        error= "El cuerpo tiene que tener por lo menos 20 caracteres y un maximo de 200";
    }
    else valido=true;
    return valido;
  }
  
  function validarEiqueta(etiqueta){
        if(etiqueta.startsWith('@')){
        Etiquetas = etiqueta.split("@");
        var i = Etiquetas.indexOf("");
        Etiquetas.splice( i, 1 );
        if(Etiquetas.length<=5)return true;
        else{
            error= "Solo puedes añadir un máximo de 5 etiquetas por pregunta.";
            return false;
        } 
    }
    else{
        error= "El formato del tag es invalido. Empieza y separa cada tag con un @";
        return false;
    } 
  }
module.exports = router;
