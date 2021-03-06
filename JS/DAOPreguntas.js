"use strict";

const {
    randomFillSync
} = require('crypto');
var moment = require('moment');

class DAOPreguntas {
    constructor(pool) {
        this.pool = pool
    }

    getPreguntas(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta ORDER BY puntos DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }
    filtrarVisitas(callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta ORDER BY visitas DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }
    filtrarFecha(callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta ORDER BY fecha DESC, id DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }
    visitaPregunta(id, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta WHERE id= ?",
                    [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var visitas = rows[0].visitas;
                                visitas++;
                                var user, tipo, nombre, idPregunta, idRespuesta, fecha;
                                user = rows[0].autor;
                                idPregunta = rows[0].id;
                                idRespuesta = 0;
                                fecha = moment().format("YYYY-MM-DD");
                                tipo = null;
                                if (visitas == 2) {
                                    tipo = "bronce";
                                    nombre = "Pregunta popular";
                                } else if (visitas == 4) {
                                    tipo = "plata";
                                    nombre = "Pregunta destacada";
                                } else if (visitas == 6) {
                                    tipo = "oro";
                                    nombre = "Pregunta famosa";
                                }
                                connection.query(
                                    "UPDATE pregunta SET visitas= ? WHERE id= ?",
                                    [visitas, id],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            if (tipo == null) {
                                                connection.release(); // devolver al pool la conexión
                                                callback(null, true); 
                                            } else {
                                                connection.query(
                                                    "INSERT INTO medallaspregunta (user,tipo,nombre,idPregunta,fecha) VALUES (?, ?, ?, ?, ?)",
                                                    [user, tipo, nombre, idPregunta, fecha],
                                                    function (err, rows) {
                                                        connection.release(); // devolver al pool la conexión
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        } else {
                                                            callback(null, true);

                                                        }
                                                    }
                                                );
                                            }

                                        }
                                    }
                                );
                            }
                        }
                    }
                );
            }
        });
    }


    puntuarPregunta(email, id, puntos, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from pregunta WHERE id= ?",
                    [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            var puntosAux = rows[0].puntos;
                            if (puntos == 1) puntosAux++;
                            else if (puntos == -1) puntosAux--;
                            var user, tipo = null,
                                nombre, idPregunta, idRespuesta, fecha;
                            user = rows[0].autor;
                            idPregunta = rows[0].id;
                            idRespuesta = 0;
                            if (puntos == 1) {
                                fecha = moment().format("YYYY-MM-DD");
                                if (puntosAux == 1) {
                                    tipo = "bronce";
                                    nombre = "Estudiante";
                                } else if (puntosAux == 2) {
                                    tipo = "bronce";
                                    nombre = "Pregunta interesante";
                                } else if (puntosAux == 4) {
                                    tipo = "plata";
                                    nombre = "Buena pregunta";
                                } else if (puntosAux == 6) {
                                    tipo = "oro";
                                    nombre = "Excelente pregunta";
                                }
                            }
                            connection.query(
                                "UPDATE pregunta SET puntos= ? WHERE id= ?",
                                [puntosAux, id],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        connection.query(
                                            "SELECT * FROM user WHERE email= ?",
                                            [email],
                                            function (err, rows) {
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                } else {
                                                    var nuevaReputacion = rows[0].reputacion;

                                                    if (puntos == 1 && rows[0].reputacion>1 ) nuevaReputacion += 10;
                                                    else if (puntos == 1 && rows[0].reputacion==1 ) nuevaReputacion += 9;
                                                    else if (puntos == -1) nuevaReputacion -= 2;
                                                    if (nuevaReputacion < 1) nuevaReputacion = 1;
                                                    connection.query(
                                                        "UPDATE user SET reputacion= ? WHERE email= ?",
                                                        [nuevaReputacion, email],
                                                        function (err, rows) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            } else {
                                                                /* Para las medallas */
                                                                if (tipo == null) {
                                                                    if (puntosAux == 5) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "oro", "Excelente pregunta", idPregunta, ],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 3) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "plata", "Buena pregunta", idPregunta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 1) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "bronce", "Pregunta interesante", idPregunta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 0) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "bronce", "Estudiante", idPregunta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else {
                                                                        connection.release(); // devolver al pool la conexión
                                                                        callback(null, true); 
                                                                    }
                                                                } else {
                                                                    connection.query(
                                                                        "INSERT INTO medallaspregunta (user,tipo,nombre,idPregunta,fecha) VALUES (?, ?, ?, ?, ?)",
                                                                        [user, tipo, nombre, idPregunta, fecha],
                                                                        function (err, rows) {
                                                                            connection.release(); // devolver al pool la conexión
                                                                            if (err) {
                                                                                callback(null, true);
                                                                            } else {
                                                                                callback(null, true); 
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }

    volverAPuntuarPregunta(email, id, puntos, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from pregunta WHERE id= ?",
                    [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            var puntosAux = rows[0].puntos;
                            if (puntos == 1) {
                                puntosAux++;
                                puntosAux++;
                            } else if (puntos == -1) {
                                puntosAux--;
                                puntosAux--;
                            }
                            var user, tipo = null,
                                nombre, idPregunta, idRespuesta, fecha;
                            user = rows[0].autor;
                            idPregunta = rows[0].id;
                            idRespuesta = 0;
                            if (puntos == 1) {

                                fecha = moment().format("YYYY-MM-DD");
                                if (puntosAux == 1) {
                                    tipo = "bronce";
                                    nombre = "Estudiante";
                                } else if (puntosAux == 2 || puntosAux == 3) {
                                    tipo = "bronce";
                                    nombre = "Pregunta interesante";
                                } else if (puntosAux == 4 || puntosAux == 5) {
                                    tipo = "plata";
                                    nombre = "Buena pregunta";
                                } else if (puntosAux >= 6) {
                                    tipo = "oro";
                                    nombre = "Excelente pregunta";
                                }
                            }
                            connection.query(
                                "UPDATE pregunta SET puntos= ? WHERE id= ?",
                                [puntosAux, id],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        connection.query(
                                            "SELECT * FROM user WHERE email= ?",
                                            [email],
                                            function (err, rows) {
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                } else {
                                                    var nuevaReputacion = rows[0].reputacion;
                                                    if (puntos == 1 && rows[0].reputacion==1 ) nuevaReputacion += 9;
                                                    else if (puntos == 1) nuevaReputacion += 12;
                                                    else if (puntos == -1) nuevaReputacion -= 12;
                                                    if (nuevaReputacion < 1) nuevaReputacion = 1;
                                                    connection.query(
                                                        "UPDATE user SET reputacion= ? WHERE email= ?",
                                                        [nuevaReputacion, email],
                                                        function (err, rows) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            } else {
                                                                /* Para las medallas */
                                                                if (tipo == null) {
                                                                    if (puntosAux == 5 || puntosAux == 4) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "oro", "Excelente pregunta", idPregunta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 3 || puntosAux == 2) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "plata", "Buena pregunta", idPregunta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 1 || puntosAux == 0) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "bronce", "Pregunta interesante", idPregunta],
                                                                            function (err, rows) {
                                                                                if (err) {
                                                                                    connection.release(); // devolver al pool la conexión
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    if (puntosAux == 0) {
                                                                                        connection.query(
                                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                                            [user, "bronce", "Estudiante", idPregunta],
                                                                                            function (err, rows) {

                                                                                                connection.release(); // devolver al pool la conexión
                                                                                                if (err) {
                                                                                                    callback(null, true);
                                                                                                } else {
                                                                                                    callback(null, true); 
                                                                                                }
                                                                                            }
                                                                                        );
                                                                                    } else {
                                                                                        connection.release(); // devolver al pool la conexión
                                                                                        callback(null, true);
                                                                                    }
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == -1) {
                                                                        connection.query(
                                                                            "DELETE FROM medallaspregunta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ?;",
                                                                            [user, "bronce", "Estudiante", idPregunta],
                                                                            function (err, rows) {

                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else {
                                                                        connection.release(); // devolver al pool la conexión
                                                                        callback(null, true); 
                                                                    }
                                                                } else { // aqui el insetar
                                                                    connection.query(
                                                                        "INSERT INTO medallaspregunta (user,tipo,nombre,idPregunta,fecha) VALUES (?, ?, ?, ?, ?)",
                                                                        [user, tipo, nombre, idPregunta, fecha],
                                                                        function (err, rows) {
                                                                            if (err) {
                                                                                callback(null, true);
                                                                            } else {
                                                                                if (puntosAux == 2) {
                                                                                    connection.query(
                                                                                        "INSERT INTO medallaspregunta (user,tipo,nombre,idPregunta, fecha) VALUES (?, ?, ?, ?, ?)",
                                                                                        [user, "bronce", "Estudiante", idPregunta, fecha],
                                                                                        function (err, rows) {
                                                                                            connection.release(); // devolver al pool la conexión
                                                                                            if (err) {
                                                                                                callback(null, true);
                                                                                            } else {
                                                                                                callback(null, true); 
                                                                                            }
                                                                                        }
                                                                                    );
                                                                                } else {
                                                                                    connection.release(); // devolver al pool la conexión
                                                                                    callback(null, true); 
                                                                                }

                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }

    puntuarRespuesta(email, idP, id, puntos, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from respuesta WHERE idPregunta= ? AND id= ?",
                    [idP, id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            var puntosAux = rows[0].puntos;
                            if (puntos == 1) puntosAux++;
                            else if (puntos == -1) puntosAux--;

                            var user, tipo = null,
                                nombre, idPregunta, idRespuesta, fecha;
                            user = rows[0].autor;
                            idPregunta = rows[0].idPregunta;
                            idRespuesta = rows[0].id;
                            if (puntos == 1) {
                                fecha = moment().format("YYYY-MM-DD");
                                if (puntosAux == 2) {
                                    tipo = "bronce";
                                    nombre = "Respuesta interesante";
                                } else if (puntosAux == 4) {
                                    tipo = "plata";
                                    nombre = "Buena respuesta";
                                } else if (puntosAux == 6) {
                                    tipo = "oro";
                                    nombre = "Excelente respuesta";
                                }
                            }


                            connection.query(
                                "UPDATE respuesta SET puntos= ? WHERE idPregunta= ? AND id= ?",
                                [puntosAux, idP, id],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        connection.query(
                                            "SELECT * FROM user WHERE email= ?",
                                            [email],
                                            function (err, rows) {
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                } else {
                                                    var nuevaReputacion = rows[0].reputacion;
                                                    if (puntos == 1 && rows[0].reputacion>1 ) nuevaReputacion += 10;
                                                    else if (puntos == 1 && rows[0].reputacion==1 ) nuevaReputacion += 9;
                                                    else if (puntos == -1) nuevaReputacion -= 2;
                                                    if (nuevaReputacion < 1) nuevaReputacion = 1;
                                                    connection.query(
                                                        "UPDATE user SET reputacion= ? WHERE email= ?",
                                                        [nuevaReputacion, email],
                                                        function (err, rows) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            } else {
                                                                /* Para las medallas */
                                                                if (tipo == null) {
                                                                    if (tipo == null) {
                                                                        if (puntosAux == 5) {
                                                                            connection.query(
                                                                                "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ?;",
                                                                                [user, "oro", "Excelente respuesta", idPregunta, idRespuesta],
                                                                                function (err, rows) {
                                                                                    connection.release(); // devolver al pool la conexión
                                                                                    if (err) {
                                                                                        callback(null, true);
                                                                                    } else {
                                                                                        callback(null, true);
                                                                                    }
                                                                                }
                                                                            );
                                                                        } else if (puntosAux == 3) {
                                                                            connection.query(
                                                                                "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ?;",
                                                                                [user, "plata", "Buena respuesta", idPregunta, idRespuesta],
                                                                                function (err, rows) {
                                                                                    connection.release(); // devolver al pool la conexión
                                                                                    if (err) {
                                                                                        callback(null, true);
                                                                                    } else {
                                                                                        callback(null, true);
                                                                                    }
                                                                                }
                                                                            );
                                                                        } else if (puntosAux == 1) {
                                                                            connection.query(
                                                                                "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ?;",
                                                                                [user, "bronce", "Respuesta interesante", idPregunta, idRespuesta],
                                                                                function (err, rows) {
                                                                                    connection.release(); // devolver al pool la conexión
                                                                                    if (err) {
                                                                                        callback(null, true);
                                                                                    } else {
                                                                                        callback(null, true); 
                                                                                    }
                                                                                }
                                                                            );
                                                                        } else {
                                                                            connection.release(); // devolver al pool la conexión
                                                                            callback(null, true); 
                                                                        }
                                                                    }
                                                                } else {
                                                                    connection.query(
                                                                        "INSERT INTO medallasrespuesta (user,tipo,nombre,idPregunta,idRespuesta,fecha) VALUES (?, ?, ?, ?, ?, ?)",
                                                                        [user, tipo, nombre, idPregunta, idRespuesta, fecha],
                                                                        function (err, rows) {
                                                                            connection.release(); // devolver al pool la conexión
                                                                            if (err) {
                                                                                callback(null, true);
                                                                            } else {
                                                                                callback(null, true); 
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }

    volverAPuntuarRespuesta(email, idP, id, puntos, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from respuesta WHERE idPregunta= ? AND id= ?",
                    [idP, id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            var puntosAux = rows[0].puntos;
                            if (puntos == 1) {
                                puntosAux++;
                                puntosAux++;
                            } else if (puntos == -1) {
                                puntosAux--;
                                puntosAux--;
                            }

                            var user, tipo = null,
                                nombre, idPregunta, idRespuesta, fecha;
                            user = rows[0].autor;
                            idPregunta = rows[0].idPregunta;
                            idRespuesta = rows[0].id;
                            if (puntos == 1) {

                                fecha = moment().format("YYYY-MM-DD");
                                if (puntosAux == 2 || puntosAux == 3) {
                                    tipo = "bronce";
                                    nombre = "Respuesta interesante";
                                } else if (puntosAux == 4 || puntosAux == 5) {
                                    tipo = "plata";
                                    nombre = "Buena respuesta";
                                } else if (puntosAux >= 6) {
                                    tipo = "oro";
                                    nombre = "Excelente respuesta";
                                }
                            }

                            connection.query(
                                "UPDATE respuesta SET puntos= ? WHERE idPregunta= ? AND id= ?",
                                [puntosAux, idP, id],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        connection.query(
                                            "SELECT * FROM user WHERE email= ?",
                                            [email],
                                            function (err, rows) {
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                } else {
                                                    var nuevaReputacion = rows[0].reputacion;
                                                    if (puntos == 1 && rows[0].reputacion>1 ) nuevaReputacion += 12;
                                                    else if (puntos == 1 && rows[0].reputacion==1 ) nuevaReputacion += 9;
                                                    else if (puntos == -1) nuevaReputacion -= 12;
                                                    if (nuevaReputacion < 1) nuevaReputacion = 1;
                                                    connection.query(
                                                        "UPDATE user SET reputacion= ? WHERE email= ?",
                                                        [nuevaReputacion, email],
                                                        function (err, rows) {
                                                            if (err) {
                                                                callback(new Error("Error de acceso a la base de datos"));
                                                            } else {
                                                                /* Para las medallas */
                                                                if (tipo == null) {
                                                                    if (puntosAux == 5 || puntosAux == 4) {
                                                                        connection.query(
                                                                            "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ?;",
                                                                            [user, "oro", "Excelente respuesta", idPregunta, idRespuesta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 3 || puntosAux == 2) {
                                                                        connection.query(
                                                                            "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ?;",
                                                                            [user, "plata", "Buena respuesta", idPregunta, idRespuesta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else if (puntosAux == 1 || puntosAux == 0) {
                                                                        connection.query(
                                                                            "DELETE FROM medallasrespuesta WHERE user=? AND tipo=? AND nombre=? AND idPregunta= ? AND idRespuesta= ? ;",
                                                                            [user, "bronce", "Respuesta interesante", idPregunta, idRespuesta],
                                                                            function (err, rows) {
                                                                                connection.release(); // devolver al pool la conexión
                                                                                if (err) {
                                                                                    callback(null, true);
                                                                                } else {
                                                                                    callback(null, true); 
                                                                                }
                                                                            }
                                                                        );
                                                                    } else {
                                                                        connection.release(); // devolver al pool la conexión
                                                                        callback(null, true); 
                                                                    }
                                                                } else {
                                                                    connection.query(
                                                                        "INSERT INTO medallasrespuesta (user,tipo,nombre,idPregunta, idRespuesta,fecha) VALUES (?, ?, ?, ?, ?, ?)",
                                                                        [user, tipo, nombre, idPregunta, idRespuesta, fecha],
                                                                        function (err, rows) {
                                                                            connection.release(); // devolver al pool la conexión
                                                                            if (err) {
                                                                                callback(null, true);
                                                                            } else {
                                                                                callback(null, true); 
                                                                            }
                                                                        }
                                                                    );
                                                                }
                                                            }
                                                        }
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }


    getRespuesta(callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM respuesta",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, false);
                            } else {
                                callback(null, rows);
                            }
                        }
                    }
                );
            }
        });
    }
    getRespuestaId(id, user, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM respuesta WHERE idPregunta= ? ORDER BY puntos DESC",
                    [id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var lista = new Array();
                                callback(null, lista);
                            } else {
                                var i = 0;
                                rows.forEach(function (row) {
                                    var fecha = row.fecha.toDateString();
                                    row.fecha = fecha;
                                    connection.query(
                                        "SELECT * FROM puntosRespuesta WHERE idPregunta= ? AND idRespuesta= ? AND user= ?",
                                        [id, row.id, user],
                                        function (err, rows1) {
                                            if (err) {
                                                callback(new Error("Error de acceso a la base de datos"));
                                            } else {
                                                if (rows1.length === 0) {
                                                    row.votado = "NO";
                                                } else {
                                                    if (rows1[0].punto == '1') {
                                                        row.votado = "1";
                                                    } else row.votado = "-1";
                                                }
                                            }
                                            i++;

                                            if (i == rows.length) {
                                                connection.release(); // devolver al pool la conexión
                                                callback(null, rows);
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



    getPreguntasId(id, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta AND T.id= ?",
                    [id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }

    getPreguntas_por_etiqueta(task, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta AND a.tag = ? ORDER BY puntos DESC",
                    [task],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }

    getPreguntas_por_texto(task, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta AND (T.titulo LIKE '%" + task + "%' OR T.cuerpo like '%" + task + "%') ORDER BY puntos DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null); 
                            } else {
                                var listaP = new Array();
                                var i = 0;
                                while (i < rows.length) {
                                    var listaTags = new Array();
                                    var pregunta = new Object();
                                    var tag = new Object();
                                    var fecha = rows[i].fecha.toDateString();
                                    pregunta.fecha = fecha;
                                    pregunta.id = rows[i].id;
                                    pregunta.titulo = rows[i].titulo;
                                    pregunta.cuerpo = rows[i].cuerpo;
                                    pregunta.autor = rows[i].autor;
                                    pregunta.visitas = rows[i].visitas;
                                    pregunta.puntos = rows[i].puntos;
                                    tag.idPregunta = rows[i].idPregunta;
                                    tag.tag = rows[i].tag;
                                    listaTags.push(tag);
                                    while (i < rows.length - 1 && rows[i].id === rows[i + 1].id) {
                                        i++;
                                        var tag2 = new Object();
                                        tag2.idPregunta = rows[i].idPregunta;
                                        tag2.tag = rows[i].tag;
                                        listaTags.push(tag2);
                                    }
                                    pregunta.tag = listaTags;
                                    listaP.push(pregunta)
                                    i++;
                                };
                                // fin del bucle
                                callback(null, listaP);
                            }
                        }
                    }
                );
            }
        });
    }


    insertPregunta(email, titulo, cuerpo, etiquetas, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM pregunta WHERE id = (SELECT MAX(id) FROM pregunta);",
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var id = 1;
                            } else {
                                var id = rows[0].id;
                                id++;
                            }
                                var hoy = moment().format("YYYY-MM-DD");
                                connection.query(
                                    "INSERT INTO pregunta (id,titulo,cuerpo,autor,fecha) VALUES (?, ?, ?, ?, ?)",
                                    [id, titulo, cuerpo, email, hoy],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            var i = 0;
                                            etiquetas.forEach(etiqueta => {
                                                connection.query(
                                                    "INSERT INTO etiqueta (idPregunta ,tag) VALUES (?, ?)",
                                                    [id, etiqueta],
                                                    function (err, rows) {
                                                        if (err) {
                                                            callback(new Error("Error de acceso a la base de datos"));
                                                        }

                                                    }
                                                );
                                                i++;
                                            });
                                            if (i == etiquetas.length) {
                                                connection.release(); // devolver al pool la conexión
                                                callback(null, true);
                                            }


                                        }
                                    }
                                );
                        }
                    }
                );
            }
        });
    }


    insertRespuesta(idPregunta, texto, autor, callback) {
        var id = 1;
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM respuesta WHERE idPregunta= ?;",
                    [idPregunta],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            connection.query(
                                "SELECT * FROM respuesta WHERE (id = (SELECT MAX(id) FROM respuesta) AND idPregunta= ?) OR( idPregunta= ? AND id= ?)",
                                [idPregunta, idPregunta, 1],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        if (rows.length != 0) {
                                            id = rows[rows.length - 1].id;
                                            id++;
                                        }
                                        var hoy = moment().format("YYYY-MM-DD");
                                        connection.query(
                                            "INSERT INTO respuesta (idpregunta,id,texto,autor,fecha) VALUES (?, ?, ?, ?, ?)",
                                            [idPregunta, id, texto, autor, hoy],
                                            function (err, rows) {
                                                connection.release(); // devolver al pool la conexión
                                                if (err) {
                                                    callback(new Error("Error de acceso a la base de datos"));
                                                } else {
                                                    callback(null, true);
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    });
            }
        });
    }


    getPreguntaEstaPuntuada(id, email, callback) { 
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from puntosPregunta WHERE idPregunta= ? AND user= ?",
                    [id, email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, "Nada");
                            } else {
                                if (rows[0].punto == 1) callback(null, "1");
                                if (rows[0].punto == -1) callback(null, "-1");
                            }
                        }
                    });
            }
        });
    }





    getRepuestaPuntuada(email, idPregunta, idRespuesta, puntos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT  * FROM puntosrespuesta WHERE idPregunta = ? AND idRespuesta = ? AND user = ?",
                    [idPregunta, idRespuesta, email],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else { //si no ha habido voto
                            if (rows.length === 0) {
                                connection.query(
                                    "INSERT INTO puntosrespuesta (idPregunta,idRespuesta,user,punto) VALUES (?, ?, ?, ?)",
                                    [idPregunta, idRespuesta, email, puntos],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            callback(null, "Insertar");
                                        }
                                    }
                                );
                            } else {
                                connection.query(
                                    "SELECT  * FROM puntosrespuesta WHERE idPregunta = ? AND idRespuesta = ? AND user = ? AND punto = ?",
                                    [idPregunta, idRespuesta, email, puntos],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else if (rows.length === 0) {
                                            connection.query(
                                                "UPDATE puntosrespuesta SET punto = ? WHERE idPregunta = ? AND idRespuesta = ? AND user = ?",
                                                [puntos, idPregunta, idRespuesta, email],
                                                function (err, rows) {
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la base de datos"));
                                                    } else {
                                                        callback(null, "Update");
                                                    }
                                                }
                                            );
                                        } else { //si ya ha puntuado like
                                            callback(null, "Nada");
                                        }
                                    }
                                );
                            }

                        }
                    }
                );
                connection.release(); // devolver al pool la conexión
            }
        });
    }

    getPreguntaPuntuada(email, idPregunta, puntos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT  * FROM puntospregunta WHERE idPregunta = ? AND user = ?",
                    [idPregunta, email],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else { //si no ha habido voto
                            if (rows.length === 0) {
                                connection.query(
                                    "INSERT INTO puntospregunta (idPregunta,user,punto) VALUES (?, ?, ?)",
                                    [idPregunta, email, puntos],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            callback(null, "Insertar");
                                        }
                                    }
                                );
                            } else {
                                connection.query(
                                    "SELECT  * FROM puntospregunta WHERE idPregunta = ? AND user = ? AND punto = ?",
                                    [idPregunta, email, puntos],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else if (rows.length === 0) {
                                            connection.query(
                                                "UPDATE puntospregunta SET punto = ? WHERE idPregunta = ? AND user = ?",
                                                [puntos, idPregunta, email],
                                                function (err, rows) {
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la base de datos"));
                                                    } else {
                                                        callback(null, "Update");
                                                    }
                                                }
                                            );
                                        } else { //si ya ha puntuado like
                                            callback(null, "Nada");
                                        }
                                    }
                                );
                            }

                        }
                    }
                );
                connection.release(); // devolver al pool la conexión
            }
        });
    }
}




module.exports = DAOPreguntas