"use strict";
var moment = require('moment');

class DAOUsers {
    constructor(pool) {
        this.pool = pool
    }
    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user WHERE email = ? AND password = ?",
                    [email, password],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); //no está el usuario con el password proporcionado
                            } else {
                                callback(null, rows[0]);
                            }
                        }
                    }
                );
            }
        });
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT img FROM user WHERE email = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); //no está el usuario con el password proporcionado
                            } else {
                                callback(null, rows[0].img);
                            }
                        }
                    }
                );
            }
        });
    }
    getUserName(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user WHERE email = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null);
                            } else {
                                var fecha = rows[0].fechaAlta.toDateString();
                                rows[0].fechaAlta = fecha;
                                callback(null, rows[0]);
                            }
                        }
                    }
                );
            }
        });
    }

    getReputacionPreguntas(email, callback) {
        var reputacion=1;
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user U, pregunta P, puntos x WHERE U.email = ? AND U.email=P.autor AND P.id=x.idPregunta AND x.idRespuesta= ?",
                    [email,0],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, 0);
                            } else {
                                var i=0;
                                rows.forEach(function (row) {
                                    if(row.punto==1){
                                        row.punto=row.punto*10;
                                    }
                                    else if(row.punto==-1){
                                        row.punto=row.punto*2;
                                    }
                                    reputacion+= row.punto;
                                    i++;
                            });
                            if(i==rows.length){
                                callback(null, reputacion);
                            }
                        }
                    }
                }
                );
            }
        });
    }


    getReputacionRespuestas(email, callback) {
        var reputacion=1;
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user U, respuesta R, puntos x WHERE U.email = ? AND U.email=R.autor AND R.idPregunta=x.idPregunta AND R.id= x.idRespuesta",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, 0);
                            } else {
                                var i=0;
                                rows.forEach(function (row) {
                                    if(row.punto==1){
                                        row.punto=row.punto*10;
                                    }
                                    else if(row.punto==-1){
                                        row.punto=row.punto*2;
                                    }
                                    reputacion+= row.punto;
                                    i++;
                            });
                            if(i==rows.length){
                                if(reputacion<1)reputacion=1;
                                callback(null, reputacion);
                            }
                        }
                    }
                }
                );
            }
        });
    }

    

    insertUser(email, password, nombre, img, callback) { // si falla el insert del tag se hace rollback?????
        this.pool.getConnection(function (err, connection) {
            if (err) {
                error = new Error("Error de acceso a la base de datos");
            } else {
                connection.query(
                    "SELECT * FROM user WHERE email = ?",
                    [email],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var hoy = moment().format("YYYY-MM-DD");
                                connection.query(
                                    "INSERT INTO user (email,password,nombre,img,reputacion,fechaAlta) VALUES (?, ?, ?, ?, ? , ?)",
                                    [email, password, nombre, img, 1,hoy],
                                    function (err, rows) {
                                        connection.release(); // devolver al pool la conexión
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            callback(null, email);
                                        }
                                    }
                                );
                            } else {
                                callback(new Error("Ya existe un usuario con este correo."));
                            }
                        }
                    }
                );
                
            }

        });
    }



    getUsuarios(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM USER",
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null);
                            } else {
                                var i =0;
                                rows.forEach(function (row) {
                                    
                                    connection.query(
                                        "SELECT tag, COUNT( tag ) AS total FROM user U, pregunta P, etiqueta E WHERE U.email=? AND U.email=P.autor AND P.id=E.idPregunta GROUP BY tag ORDER BY total DESC",
                                        [row.email],
                                        function (err, rows1) {
                                            i++;
                                            if (err) {
                                                callback(new Error("Error de acceso a la base de datos"));
                                            } else {
                                                if (rows1.length === 0) {
                                                    row.tag=null;
                                                } else {
                                                    row.tag=rows1[0].tag;
                                                }
                                                if(i==rows.length){
                                                    connection.release(); // devolver al pool la conexión
                                                    callback(null, rows);
                                                }
                                            }
                                            
                                        }
                                    );
                                });
                            }
                        }
                    }
                );
            }
        });
    }

    getPreguntasUsuario(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user U, pregunta P WHERE u.email= ? AND U.email=P.autor ",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var lista = new Array();
                                callback(null, lista);
                            } else {
                                callback(null, rows);
                            }
                        }
                    }
                );
            }
        });
    }

    getRespuestasUsuario(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user U, respuesta P WHERE u.email= ? AND U.email=P.autor ",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var lista = new Array();
                                callback(null, lista);
                            } else {
                                callback(null, rows);
                            }
                        }
                    }
                );
            }
        });
    }

    getEtiquetaPrincipal(email, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT tag, COUNT( tag ) AS total FROM user U, pregunta P, etiqueta E WHERE U.email=? AND U.email=P.autor AND P.id=E.idPregunta GROUP BY tag ORDER BY total DESC",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var lista = new Array();
                                callback(null, lista);
                            } else {
                                callback(null, rows[0].tag);
                            }
                        }
                    }
                );
            }
        });
    }



    getUsuarios_filtro(filtro,callback){
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user WHeRE email LIKE '%"+filtro+"%' OR nombre like '%" +filtro+"%' ORDER BY reputacion DESC",                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null);
                            } else {
                                var i =0;
                                rows.forEach(function (row) {
                                    
                                    connection.query(
                                        "SELECT tag, COUNT( tag ) AS total FROM user U, pregunta P, etiqueta E WHERE U.email=? AND U.email=P.autor AND P.id=E.idPregunta GROUP BY tag ORDER BY total DESC",
                                        [row.email],
                                        function (err, rows1) {
                                            i++;
                                            if (err) {
                                                callback(new Error("Error de acceso a la base de datos"));
                                            } else {
                                                if (rows1.length === 0) {
                                                    row.tag=null;
                                                } else {
                                                    row.tag=rows1[0].tag;
                                                }
                                                if(i==rows.length){
                                                    connection.release(); // devolver al pool la conexión
                                                    callback(null, rows);
                                                }
                                            }
                                            
                                        }
                                    );
                                });
                            }
                        }
                    }
                );
            }
        });
    }
    getMedallaVisitas(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta WHERE autor = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, listaMedallas);
                            } else {
                                var i=0;
                                rows.forEach(function (row) {
                                    if(row.visitas>=2 && row.visitas<=3){
                                        var medalla= new Object;
                                        medalla.metal="bronce";
                                        medalla.nombre="Pregunta popular";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.visitas>=4 && row.visitas<=5){
                                        var medalla= new Object;
                                        medalla.metal="plata";
                                        medalla.nombre="Pregunta destacada";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.visitas>=6 ){
                                        var medalla= new Object;
                                        medalla.metal="oro";
                                        medalla.nombre="Pregunta famosa";
                                        listaMedallas.push(medalla);
                                    }
                                    
                                    i++;
                                });
                                if(i==rows.length)callback(null, listaMedallas);
                            }
                        }
                    }
                );
            }
        });
    }

    getMedallaPregunta(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta WHERE autor = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, listaMedallas);
                            } else {
                                var i=0;
                                rows.forEach(function (row) {
                                    if(row.puntos==1){
                                        var medalla= new Object;
                                        medalla.metal="bronce";
                                        medalla.nombre="Estudiante";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.puntos==2 || row.puntos==3 ){
                                        var medalla= new Object;
                                        medalla.metal="bronce";
                                        medalla.nombre="Pregunta interesante";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.puntos==4 || row.puntos==5){
                                        var medalla= new Object;
                                        medalla.metal="plata";
                                        medalla.nombre="Buena pregunta";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.puntos>=6){
                                        var medalla= new Object;
                                        medalla.metal="oro";
                                        medalla.nombre="Excelente pregunta";
                                        listaMedallas.push(medalla);
                                    }
                                    
                                    i++;
                                });
                                if(i==rows.length)callback(null, listaMedallas);
                            }
                        }
                    }
                );
            }
        });
    }

    getMedallaRespuesta(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM respuesta WHERE autor = ?",
                    [email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, listaMedallas);
                            } else {
                                var i=0;
                                rows.forEach(function (row) {
                                    if(row.puntos==2||row.puntos==3){
                                        var medalla= new Object;
                                        medalla.metal="bronce";
                                        medalla.nombre="Respuesta interesante";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.puntos==4 || row.puntos==5 ){
                                        var medalla= new Object;
                                        medalla.metal="plata";
                                        medalla.nombre="Buena respuesta";
                                        listaMedallas.push(medalla);
                                    }
                                    else if(row.puntos>=6){
                                        var medalla= new Object;
                                        medalla.metal="oro";
                                        medalla.nombre="Excelente respuesta";
                                        listaMedallas.push(medalla);
                                    }
                                    
                                    i++;
                                });
                                if(i==rows.length)callback(null, listaMedallas);
                            }
                        }
                    }
                );
            }
        });
    }
}
module.exports = DAOUsers