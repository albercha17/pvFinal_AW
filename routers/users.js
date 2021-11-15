var express = require('express');
var router_login = express.Router();

let usuario_identificado = false;


// middleware that is specific to this router_login

function identificador(request,response,next){
    if(usuario_identificado){
        next();
    }
    else{
        response.redirect("/login");
    }
}

// define the home page route
router_login.get("/inicio_Sesion", function(request, response) {
    if(usuario_identificado){ response.render("secreto");}
    else{ response.sendFile(path.join(__dirname, "./Views/Templates","login.html"));}
});


router_login.get("/logearse", function (request, response) {
    daoUser.isUserCorrect(request.query.nombre,request.query.password,cb_isUserCorrect);
    response.redirect("/secreto");
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

module.exports = router_login;