"use strict";

const mysql = require("mysql");
const config = require("./JS/config");
const DAOUsers = require("./JS/DAOUsers");
// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});
let daoUser = new DAOUsers(pool);




const path = require("path");
const express = require("express");
const {
    request
} = require("http");
const {
    response
} = require("express");
const app = express();
var router_user = require("./routers/users")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


var usuario = new Object();
usuario.nombre = null;
usuario.email = null;
usuario.img = null;
usuario.identificado = false;
usuario.contraseña = null;
var errorCrearUsuario = null;
var errorLogin = null;
var log_o_SingUp = false;  // esto lo pongo para cuando no se esta identificado saber si ir al login o al singup

//MIDDELWARE  ------------------------------------------------------------------------------------------------------------------------------------
//error404
function middelware404Error(request, response, next) {
    response.status(404);
    response.render("error404", {
        url: request.url
    });
};
//error505
function middelware500Error(error, request, response, next) {
    response.status(500);
    response.render("error500", {
        mensaje: error.message,
        pila: error.stack
    });
};
//comprobar que se esta logeado
function identificador(request, response, next) {
    if (usuario.identificado) {
        next();
    } else {
        if (log_o_SingUp == false) {
            response.redirect("/login");
        } else {
            response.redirect("/SingUp");
            log_o_SingUp = false;
        }

    }
}



// rutas-------------------------------------------------------------------------------------------------------------------------------------

app.get("/login", function (request, response) {
    if (usuario.identificado) {
        response.redirect("/inicio");
    } else {
        response.render("login", {
            errorLogin: errorLogin
        });
    }
    errorLogin = null;
});
app.get("/SingUp", function (request, response) {
    if (usuario.identificado) {
        response.redirect("/inicio");
    } else {
        response.render("SingUp", {
            errorCrearUsuario: errorCrearUsuario
        });
    }
    errorCrearUsuario = null;
});
app.get("/", identificador, function (request, response) {
    // response.status(200);
    response.redirect("/inicio");
});
app.get("/inicio", identificador, function (request, response) {
    // response.status(200);
    response.render("inicio", {
        nombre: usuario.nombre
    });
});


// funciones de las vistas --------------------------------------------------------------------------------------------------------------

// funcion logearse------------------------------------------------------------------------------------
app.get("/logearse", function (request, response) {
    daoUser.isUserCorrect(request.query.email, request.query.password, cb_isUserCorrect);
    response.redirect("/inicio");
});

function cb_isUserCorrect(err, result) {
    if (err) {
        usuario.identificado = false;
        console.log(err.message);
    } else if (result) {
        usuario.identificado = true;
        daoUser.getUserName(result.email, buscarNombre);
        console.log("Usuario y contraseña correctos");
    } else {
        usuario.identificado = false;
        errorLogin = "Usuario y/o contraseña incorrectos";
        console.log("Usuario y/o contraseña incorrectos");

    }
}


//funcion crear usuario------------------------------------------------------------------------------------------------
app.get("/crearUsuario", function (request, response) {
    //validar datos
    var img = imagenPerfil(request.query.img);
    var datosValidados = validarDatos(request.query.email, request.query.password, request.query.password_r);

    if (datosValidados) {
        daoUser.insertUser(request.query.email, request.query.password, request.query.nombre, img, crearusuario);

    }
    log_o_SingUp = true;
    response.redirect("/inicio");
});

function crearusuario(err, result) {
    if (err) {
        errorCrearUsuario = err;
        usuario.identificado = false;
        console.log(err.message);
    } else if (result) {
        usuario.identificado = true;
        daoUser.getUserName(result, buscarNombre);
        console.log("Usuario creado");
    }
}

function buscarNombre(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        usuario.nombre = result.nombre;
        console.log("Usuario:" + result.email);
    } else {
        console.log("Usuario incorrecto");
    }
}

//errores y listen--------------------------------------------------------------------------------------------------------------------------

app.use(middelware404Error);
app.use(middelware500Error);
app.listen(3000, function (err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});










//funciones -----------------------------------------------------------------------------------------------------------------------------


function validarDatos(email, contraseña, contraseña_r) {
    var valido = false;
    if (contraseña != contraseña_r) {
        errorCrearUsuario = "Las contraseñas no coinciden";
        console.log();
    } else if (validarEmail(email) && contraseña == contraseña_r) valido = true;
    return valido;
}

function validarEmail(email) {
    var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (!re.exec(email)) {
        errorCrearUsuario = "Correo no valido. Tiene que contener un @ con un . --> ejemplo: albercha@404.es";
        console.log("Correo no valido");
        return false;
    } else return true;
}

function imagenPerfil(img) {
    if (img) {
        return img;
    } else {
        var listaImagenes = ['/Imagenes_de_perfil/sfg.png',
            '/Imagenes_de_perfil/roberto.png', '/Imagenes_de_perfil/nico.png',
            '/Imagenes_de_perfil/marta.png', '/Imagenes_de_perfil/kuroko.png',
            '/Imagenes_de_perfil/defecto3.png', '/Imagenes_de_perfil/defecto2.png',
            '/Imagenes_de_perfil/defecto1.png', '/Imagenes_de_perfil/amy.png'
        ];
        var numero = Math.floor(Math.random() * (listaImagenes.length - 0));
        return listaImagenes[numero];
    }
}
