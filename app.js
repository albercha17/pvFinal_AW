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
const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

let nombre = "usuario";
let password = "1234";
let usuario_identificado = false;



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
    // response.status(200);
    if(usuario_identificado){
        response.redirect("/inicio");
    }
    else{
        response.render("login");
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
app.get("/otro_secreto",identificador, function (request, response) {
    // response.status(200);
    response.render("otro_secreto");
});
app.get("/publico",identificador, function (request, response) {
    // response.status(200);
    response.render("publico");
});


// funciones de las vistas

app.get("/login1", function (request, response) {
    daoUser.isUserCorrect(request.query.nombre,request.query.password,cb_isUserCorrect);
    daoUser.getUserName(request.query.nombre,coseguir_nomnbre);
    if(usuario_identificado){
        response.redirect("/inicio");
    }
    else{
        response.redirect("/login");
    }
});



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
function coseguir_nomnbre(err, result) {
    if (err) {
        console.log(err.message);
    } else if (result) {
        usuario_identificado = true;
        nombre=result;
    }
}

function identificador(request,response,next){
    if(usuario_identificado){
        next();
    }
    else{
        response.redirect("/login");
    }
}
