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
const { request } = require("http");
const { response } = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let nombre = "usuario";
let password = "1234";
let usuario_identificado = false;


//MIDDELWARE  ------------------------------------------------------------------------------------------------------------------------------------
//error404
function middelware404Error(request,response,next){    
    response.status(404);
    response.render("error404",{url:request.url});
};
//error505
function middelware500Error(error, request,response,next){    
    response.status(500);
    response.render("error500",{
        mensaje:error.message,
        pila:error.stack});
};
//comprobar que se esta logeado
function identificador(request,response,next){
    if(usuario_identificado){
        next();
    }
    else{
        response.redirect("/login");
    }
}



// rutas
app.get("/", function (request, response) {
    // response.status(200);
    response.redirect("/login");
});
app.get("/login", function (request, response) {
    if(usuario_identificado){
        response.render("secreto");
    }
    else{
        response.sendFile(path.join(__dirname, "/Views/Templates","login.html"));
    }
    
});

app.get("/inicio",identificador, function (request, response) {
    // response.status(200);
    response.render("inicio",{nombre1:nombre});
});
app.get("/secreto",identificador, function (request, response) {
    // response.status(200);
    response.render("secreto");
});


// funciones de las vistas

app.get("/logearse", function (request, response) {
    daoUser.isUserCorrect(request.query.nombre,request.query.password,cb_isUserCorrect);
    response.redirect("/secreto");
});


//errores y listen

app.use(middelware404Error);
app.use(middelware500Error);
app.listen(3000, function(err) {
    if (err) {
        console.error("No se pudo inicializar el servidor: " +
            err.message);
    } else {
        console.log("Servidor arrancado en el puerto 3000");
    }
});




//callbacks
function cb_isUserCorrect(err, result) {
    if (err) {
        usuario_identificado = false;
        console.log(err.message);
    } else if (result) {
        usuario_identificado = true;
        console.log("Usuario y contraseña correctos");
    } else {
        usuario_identificado = false;
        console.log("Usuario y/o contraseña incorrectos");
    }
}
