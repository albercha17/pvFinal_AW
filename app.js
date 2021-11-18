"use strict";

const path = require("path");
const express = require("express");
const {
    request
} = require("http");
const {
    response
} = require("express");
const app = express();
const session= require("express-session")
const cookieParser=require("cookie-parser")
var router_user = require("./routers/users")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


const middelwareSession=session({
    saveUninitialized:false,
    secret:"foobar34",
    resave:false,
    
});


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
function identificador(request, response, next) {
    if(!creado){
        response.cookie("identificado",false);
        creado=true;
    }
    identificado=request.cookies.identificado;
    if (identificado!='false') {
      next();
    } else {
      response.redirect("/login");
    }
  }

  
  app.use(cookieParser());

//------------------------------------------  R U T A S  -------------------------------------------------------------------------------------------
//router_user

app.get("/login",router_user);
app.get("/loguearse",router_user);
app.get("/SingUp",router_user);
app.get("/crearUsuario",router_user);



app.get("/", identificador, function (request, response) {
    response.redirect("/inicio");
  });
app.get("/inicio", identificador, function (request, response) {
    response.render("inicio", {
      nombre: request.cookies.nombre,
    });
  });





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










