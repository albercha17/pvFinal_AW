const { response } = require("express");

const miRouter=express.Router();

miRouter.get("/crear_usuario", function(request,response0{
    console.log("Creando usario,");
    response.end();
}))