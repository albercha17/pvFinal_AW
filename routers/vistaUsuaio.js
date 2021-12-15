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
const DAOUser= FactoryDao.getDaoUsers();

//--------------------------------------------------
//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/usuario/:email", function (request, response) {
    var listaMedallas= new Object();
    listaMedallas.bronce= new Object();
    listaMedallas.plata= new Object();
    listaMedallas.oro= new Object();
    DAOUser.getUserName(request.params.email, function buscarNombre(err, result) {
        if (err) {
            response.status(500);
        } else if (result) {
            var usuario = result;
            DAOUser.getPreguntasUsuario(request.params.email, function buscarP(err, result) {
                if (err) {
                    response.status(500);
                } else if (result) {
                    var preguntas = result;
                    DAOUser.getRespuestasUsuario(request.params.email, function buscarR(err, result) {
                        if (err) {
                            response.status(500);
                        } else if (result) {
                            var respuestas = result;
                            DAOUser.getMedallaBronce(request.params.email, function bronceM(err, result) {
                                if (err) {
                                    response.status(500);
                                } else if (result) {
                                    listaMedallas.bronce= contarBronce(result);
                                    DAOUser.getMedallaPlata(request.params.email, function plataP(err, result) {
                                        if (err) {
                                            response.status(500);
                                        } else if (result) {
                                            listaMedallas.plata= contarPlata(result);
                                            DAOUser.getMedallaOro(request.params.email, function oroP(err, result) {
                                                if (err) {
                                                    response.status(500);
                                                } else if (result) {
                                                    listaMedallas.oro= contarOro(result);
                                                    response.status(200);
                                                    response.render("vistaUsuario", {
                                                        nombre: request.session.nombre,
                                                        email: request.session.email,
                                                        usuario: usuario,
                                                        preguntas: preguntas,
                                                        respuestas: respuestas,
                                                        listaMedallas:listaMedallas,
                                                        img:request.session.img,
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

        }
    })
});

function contarBronce(lista){
    var bronce= new Object();
    bronce.cont= lista.length;
    var nueva= new Array(4);
    nueva[0]= new Object();
    nueva[0].cont=0;
    nueva[0].nombre="Estudiante";

    nueva[1]=new Object();
    nueva[1].cont=0;
    nueva[1].nombre="Pregunta interesante";

    nueva[2]=new Object();
    nueva[2].cont=0;
    nueva[2].nombre="Pregunta popular";

    nueva[3]=new Object();
    nueva[3].cont=0;
    nueva[3].nombre="Respuesta interesante";

    lista.forEach(element => {
        if(element.nombre=="Estudiante"){
            nueva[0].cont++;
        }
        else if(element.nombre=="Pregunta interesante"){
            nueva[1].cont++;
        }
        else if(element.nombre=="Pregunta popular"){
            nueva[2].cont++;
        }
        else if(element.nombre=="Respuesta interesante"){
            nueva[3].cont++;
        }
    });
    bronce.lista=nueva;
    return bronce;
}
function contarPlata(lista){
    var plata= new Object();
    plata.cont= lista.length;
    var nueva= new Array(3);
    nueva[0]= new Object();
    nueva[0].cont=0;
    nueva[0].nombre="Buena pregunta";

    nueva[1]=new Object();
    nueva[1].cont=0;
    nueva[1].nombre="Pregunta destacada";

    nueva[2]=new Object();
    nueva[2].cont=0;
    nueva[2].nombre="Buena respuesta";

    lista.forEach(element => {
        if(element.nombre=="Buena pregunta"){
            nueva[0].cont++;
        }
        else if(element.nombre=="Pregunta destacada"){
            nueva[1].cont++;
        }
        else if(element.nombre=="Buena respuesta"){
            nueva[2].cont++;
        }
    });
    plata.lista=nueva;
    return plata;
}
function contarOro(lista){
    var oro= new Object();
    oro.cont= lista.length;
    var nueva= new Array(3);
    nueva[0]= new Object();
    nueva[0].cont=0;
    nueva[0].nombre="Excelente pregunta";

    nueva[1]=new Object();
    nueva[1].cont=0;
    nueva[1].nombre="Pregunta famosa";

    nueva[2]=new Object();
    nueva[2].cont=0;
    nueva[2].nombre="Excelente respuesta";

    lista.forEach(element => {
        if(element.nombre=="Excelente pregunta"){
            nueva[0].cont++;
        }
        else if(element.nombre=="Pregunta famosa"){
            nueva[1].cont++;
        }
        else if(element.nombre=="Excelente respuesta"){
            nueva[2].cont++;
        }
    });
    oro.lista=nueva;
    return oro;
}

  

module.exports = router;
