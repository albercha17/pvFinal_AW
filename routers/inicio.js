var express = require("express");
var router = express.Router(); // creo el router
const path = require("path");
const { request } = require("http");
const { response } = require("express");

const cookieParser=require("cookie-parser")
//--------------------------------------------------


//--------------------------------------  M I D D E L W A R E  ---------------------------------------------------------
router.use(cookieParser());
router.use(express.static(__dirname + '/public'));

//--------------------------------------  R U T A S ---------------------------------------------------------
router.get("/", function (request, response) {
    response.redirect("/inicio");
  });
router.get("/inicio", function (request, response) {
    response.render("inicio", {
      nombre: request.cookies.nombre,
    });
  });
  router.get("/desconectarse", function (request, response) {
    response.cookie("identificado",false);
    response.redirect("/login");
  });
module.exports = router;
