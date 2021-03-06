var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");
const fs = require('fs');
const multer  = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
//DAOS   -----------------------------------------------------

const FactoryDao = require("../JS/FactoriaDao");
const daoUser= FactoryDao.getDaoUsers();

//--------------------------------------------------
var identificado = false;
var errorLogin = null;
var errorCrearUsuario = null;

//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------

//--------------------------------------  R U T A S ---------------------------------------------------------



router.get("/login", function (request, response) {
  identificado=request.session.identificado;
  if (identificado!=false) {
    response.redirect("/inicio");

  } else {
    response.status(200);
    response.render("login", {
      errorLogin: errorLogin,
    });
  }
  errorLogin = null;
});

router.get("/SingUp", function (request, response) {
  response.status(200);
    response.render("SingUp", {
      errorCrearUsuario: errorCrearUsuario,
  });

  errorCrearUsuario = null;
});

//--------------------------------------  F U N C I O N E S ---------------------------------------------------------

//--------------------------------------  loguear usuario ---------------------------------------------------------
router.post("/loguearse", function (request, response) {
  daoUser.isUserCorrect(
    request.body.email,
    request.body.password,
    function cb_isUserCorrect(err, result) {
      if (err) {
        identificado = false;
        request.session.identificado=false;
        response.status(500);
      } 
      else if (result) {
        identificado = true;
        request.session.identificado=true;
        daoUser.getUserName(result.email, function buscarNombre(err, result) {
          if (err) {
            response.status(500);
          } else if (result){
            request.session.nombre=result.nombre;
            request.session.email=result.email;
            request.session.img=result.img;
            console.log("Usuario:" + result.email);
            response.redirect("/inicio");
          }
        });
      } 
      else {
        
        identificado = false;
        request.session.identificado=false;
        errorLogin = "Usuario y/o contrase??a incorrectos";
        response.redirect("/login");
      }
    }
  );
});

//--------------------------------------  crear usuario ---------------------------------------------------------

router.post("/crearUsuario", upload.single('img') ,function (request, response) {
  //validar datos
  if(request.file){
    var img= request.file.buffer;
  }
  else{
    var img = imagenPerfil();
  }
  
  var datosValidados = validarDatos(
    request.body.email,
    request.body.password,
    request.body.password_r
  );

  if (datosValidados) {
    daoUser.insertUser(
      request.body.email,
      request.body.password,
      request.body.nombre,
      img,
      function crearusuario(err, result) {
        if (err) {
          errorCrearUsuario = err;
          response.status(500);
          response.redirect("/SingUp");
        } else if (result) {
          identificado = true;
          request.session.identificado=true;
          daoUser.getUserName(result, function buscarNombre(err, result) {
            if (err) {
              response.status(500);
            } else if (result) {
              request.session.nombre=result.nombre;
              request.session.email=result.email;
              request.session.img=result.img;
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
  }
   else response.redirect("/SingUp");
});

//--------------------------------------  F U N C I O N E S     S E C U N D A R I A S ---------------------------------------------------------

function validarDatos(email, contrase??a, contrase??a_r) {
  var valido = false;
  if (contrase??a.search(/[a-z]/i) < 0 || contrase??a.search(/[0-9]/) < 0 || contrase??a.length<8 ) {
    errorCrearUsuario = "Las contrase??a tiene que tener 8 caracteres, con una letra y un numero por lo menos.";
}
   else if (contrase??a != contrase??a_r) {
    errorCrearUsuario = "Las contrase??as no coinciden";
  } else if (validarEmail(email) && contrase??a == contrase??a_r) valido = true;
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

function imagenPerfil() {
    var listaImagenes = [
      "public/Images/defecto3.png",
      "public/Images/defecto2.png",
      "public/Images/defecto1.png",
    ];
    var numero = Math.floor(Math.random() * (listaImagenes.length - 0));
    let buf = fs.readFileSync(listaImagenes[numero]);
    return buf;
}

module.exports = router;
