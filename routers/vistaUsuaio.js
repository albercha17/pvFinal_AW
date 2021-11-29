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
var DAOUser = Factorydao.DaoUser();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/usuario/:email", function (request, response) {
    var listaMedallas= new Object();
    listaMedallas.visitas= new Array();
    listaMedallas.pregunta= new Array();
    listaMedallas.respuesta= new Array();
    DAOUser.getUserName(request.params.email, function buscarNombre(err, result) {
        if (err) {
            response.status(500);
        } else if (result) {
            var usuario = result;
            DAOUser.getPreguntasUsuario(request.params.email, function buscarNombre(err, result) {
                if (err) {
                    response.status(500);
                } else if (result) {
                    var preguntas = result;
                    DAOUser.getRespuestasUsuario(request.params.email, function buscarNombre(err, result) {
                        if (err) {
                            response.status(500);
                        } else if (result) {
                            var respuestas = result;
                            DAOUser.getMedallaVisitas(request.params.email, function buscarNombre(err, result) {
                                if (err) {
                                    response.status(500);
                                } else if (result) {
                                    listaMedallas.visitas= result;
                                    DAOUser.getMedallaPregunta(request.params.email, function buscarNombre(err, result) {
                                        if (err) {
                                            response.status(500);
                                        } else if (result) {
                                            listaMedallas.pregunta= result;
                                            DAOUser.getMedallaRespuesta(request.params.email, function buscarNombre(err, result) {
                                                if (err) {
                                                    response.status(500);
                                                } else if (result) {
                                                    listaMedallas.respuesta= result;
                                                            response.status(200);
                                                            response.render("vistaUsuario", {
                                                                nombre: request.session.nombre,
                                                                email: request.session.email,
                                                                usuario: usuario,
                                                                preguntas: preguntas,
                                                                respuestas: respuestas,
                                                                listaMedallas:listaMedallas,
                                                            });
                                                }
                                        });
                                    }
                                    })
                                }
                            })
                        }
                    })

                }
            })

        }
    })
});


/* DAOUser.getUserName(request.params.email, function buscarNombre(err, result) {
        if (err) {
            response.status(500);
        } else if (result) {
            var usuario = result;
            DAOUser.getPreguntasUsuario(request.params.email, function buscarNombre(err, result) {
                if (err) {
                    response.status(500);
                } else if (result) {

        }
    })*/

  

module.exports = router;
