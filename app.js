"use strict";
const config = require("./JS/config");
const path = require("path");
const express = require("express");
const {
    request
} = require("http");
const {
    response
} = require("express");
const app = express();

//-------------------------------------------------------PLANTILLAS------------------------------------
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(__dirname + '/public'));


//---------------------------------------------------- SESION-----------------------------
const session= require("express-session")
const MySQLSession = require("express-mysql-session");
const MySQLStore=MySQLSession(session);
const sessionStrore= new MySQLStore({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database,
});
const middelwareSession=session({
    saveUninitialized:false,
    secret:"foobar34",
    resave:false,
    store:sessionStrore
});
app.use(middelwareSession);

//cookies
const cookieParser=require("cookie-parser")
app.use(cookieParser());


//-----------------------------------------------------------------------------------------------------
//-------------------------- ROUTERS---------------------
var router_user = require("./routers/users")
var router_inicio = require("./routers/inicio");
var router_usuarios = require("./routers/usuariosRegistrados");
var router_pSR = require("./routers/preguntasSR");
var router_crearPregunta = require("./routers/CrearPregunta");


var identificado=false;
var creado=false;
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

// Para saber si esta identificado
function identificador(request, response, next) {
    if(!creado){
        request.session.identificado=false;
        creado=true;
    }
    identificado=request.session.identificado;
    if (identificado!=false) {
      next();
    } else {
      response.redirect("/login");
    }
  }
  
//------------------------------------------  R U T A S  -------------------------------------------------------------------------------------------
//router_user

app.get("/login",router_user);
app.get("/loguearse",router_user);
app.get("/SingUp",router_user);
app.get("/crearUsuario",router_user);


//router_inicio
app.get("/",identificador,router_inicio);
app.get("/inicio",identificador,router_inicio);
app.get("/desconectarse",identificador,router_inicio);
app.get("/BuscarEtiqueta",identificador,router_inicio);
app.get("/BuscarTexto",identificador,router_inicio);

//router usuarios
app.get("/usuarios",identificador,router_usuarios);
app.get("/BuscarUsuario",identificador,router_usuarios);


//router router_pSR
app.get("/SinResponder",identificador,router_pSR);
app.get("/BuscarEtiquetaSR",identificador,router_pSR);
app.get("/BuscarTextoSR",identificador,router_pSR);


// router router_crearPregunta

app.get("/FormularPregunta",identificador,router_crearPregunta);
app.get("/CrearPregunta",identificador,router_crearPregunta);

//Errores

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










