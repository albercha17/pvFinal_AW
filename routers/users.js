var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");
//DAOS   -----------------------------------------------------
const config = require("../JS/config");
const mysql = require("mysql");
const DAOUsers = require("../JS/DAOUsers");
// Crear el pool de conexiones
const pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database,
});
let daoUser = new DAOUsers(pool);
//--------------------------------------------------

//const session= require("express-session")
//const cookieParser=require("cookie-parser") vbvg

var identificado = false;
var errorLogin = null;
var errorCrearUsuario = null;
var nombre = "";

//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------

function identificador(request, response, next) {
  if (identificado) {
    next();
  } else {
    response.redirect("/login");
  }
}
//--------------------------------------  R U T A S ---------------------------------------------------------

router.get("/", identificador, function (request, response) {
  response.redirect("/inicio");
});
router.get("/inicio", identificador, function (request, response) {
  response.render("inicio", {
    nombre: nombre,
  });
});

router.get("/login", function (request, response) {
  if (identificado) {
    response.redirect("/inicio");
  } else {
    response.render("login", {
      errorLogin: errorLogin,
    });
  }
  errorLogin = null;
});

router.get("/SingUp", function (request, response) {
  if (identificado) {
    response.redirect("/login");
  } else {
    response.render("SingUp", {
      errorCrearUsuario: errorCrearUsuario,
    });
  }

  errorCrearUsuario = null;
});

//--------------------------------------  F U N C I O N E S ---------------------------------------------------------

//--------------------------------------  loguear usuario ---------------------------------------------------------
router.get("/loguearse", function (request, response) {
  daoUser.isUserCorrect(
    request.query.email,
    request.query.password,
    function cb_isUserCorrect(err, result) {
      if (err) {
        identificado = false;
        console.log(err.message);
      } else if (result) {
        identificado = true;
        daoUser.getUserName(result.email, function buscarNombre(err, result) {
          if (err) {
            console.log(err.message);
          } else if (result) {
            nombre = result.nombre;
            console.log("Usuario:" + result.email);
          } else {
            console.log("Usuario incorrecto");
          }
          response.redirect("/inicio");
        });
        console.log("Usuario y contraseña correctos");
      } else {
        identificado = false;
        errorLogin = "Usuario y/o contraseña incorrectos";
        console.log("Usuario y/o contraseña incorrectos");
      }
      response.redirect("/inicio");
    }
  );
});

//--------------------------------------  crear usuario ---------------------------------------------------------

router.get("/crearUsuario", function (request, response) {
  //validar datos
  var img = imagenPerfil(request.query.img);
  var datosValidados = validarDatos(
    request.query.email,
    request.query.password,
    request.query.password_r
  );

  if (datosValidados) {
    daoUser.insertUser(
      request.query.email,
      request.query.password,
      request.query.nombre,
      img,
      function crearusuario(err, result) {
        if (err) {
          errorCrearUsuario = err;
          console.log(err.message);
          response.redirect("/SingUp");
        } else if (result) {
          identificado = true;
          daoUser.getUserName(result, function buscarNombre(err, result) {
            if (err) {
              console.log(err.message);
              response.redirect("/SingUp");
            } else if (result) {
              nombre = result.nombre;
              console.log("Usuario:" + result.email);
              response.redirect("/inicio");
            } else {
              console.log("Usuario incorrecto");
              response.redirect("/SingUp");
            }
          });
          console.log("Usuario creado");
        }
      }
    );
  } else response.redirect("/SingUp");
});

//--------------------------------------  F U N C I O N E S     S E C U N D A R I A S ---------------------------------------------------------

function validarDatos(email, contraseña, contraseña_r) {
  var valido = false;
  if (contraseña != contraseña_r) {
    errorCrearUsuario = "Las contraseñas no coinciden";
    console.log();
  } else if (validarEmail(email) && contraseña == contraseña_r) valido = true;
  return valido;
}

function validarEmail(email) {
  var re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  if (!re.exec(email)) {
    errorCrearUsuario =
      "Correo no valido. Tiene que contener un @ con un . --> ejemplo: albercha@404.es";
    console.log("Correo no valido");
    return false;
  } else return true;
}

function imagenPerfil(img) {
  if (img) {
    return img;
  } else {
    var listaImagenes = [
      "/Imagenes_de_perfil/sfg.png",
      "/Imagenes_de_perfil/roberto.png",
      "/Imagenes_de_perfil/nico.png",
      "/Imagenes_de_perfil/marta.png",
      "/Imagenes_de_perfil/kuroko.png",
      "/Imagenes_de_perfil/defecto3.png",
      "/Imagenes_de_perfil/defecto2.png",
      "/Imagenes_de_perfil/defecto1.png",
      "/Imagenes_de_perfil/amy.png",
    ];
    var numero = Math.floor(Math.random() * (listaImagenes.length - 0));
    return listaImagenes[numero];
  }
}

module.exports = router;
