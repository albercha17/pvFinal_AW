"use strict";

const { randomFillSync } = require('crypto');
var moment = require('moment');

class DAOPreguntas {
    constructor(pool) {
        this.pool = pool
    }

    getPreguntas(callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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
    filtrarVisitas(callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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


    filtrarFecha(callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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
    visitaPregunta(id, callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
                            } else {
                                var visitas = rows[0].visitas;
                                visitas++;
                                connection.query(
                                    "UPDATE pregunta SET visitas= ? WHERE id= ?",
                                    [visitas, id],
                                    function (err, rows) {
                                        connection.release(); // devolver al pool la conexión
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                            callback(null, true); //no está el usuario con el password proporcionado

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
    getEstaPuntuada(id,idR, email, callback) { // preguntar si puede ser un pregunta sin tag
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from puntos WHERE idPregunta= ? AND idRespuesta= ? AND user= ?",
                    [id, idR, email],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, "Nada");
                            } else {
                                if(rows[0].punto==1) callback(null,"1");
                                if(rows[0].punto==-1) callback(null, "-1");
                            }
                        }
                    });
                }
            });
        }


    puntuarPregunta(id, puntos, callback) { // preguntar si puede ser un pregunta sin tag
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
                            if(puntos==1) puntosAux++;
                            else if(puntos==-1) puntosAux--;
                            else if(puntos==2){
                                puntosAux++;
                                puntosAux++;
                            }else if(puntos==-2){
                                puntosAux--;
                                puntosAux--;
                            } 
                            connection.query(
                                "UPDATE pregunta SET puntos= ? WHERE id= ?",
                                [puntosAux, id],
                                function (err, rows) {
                                    connection.release(); // devolver al pool la conexión
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        callback(null, true); //no está el usuario con el password proporcionado
                                    }
                                }
                            );
                        }
                    }
                );
            }
        });
    }

    puntuarRespuesta(idP, id, puntos, callback) { // preguntar si puede ser un pregunta sin tag
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * from respuesta WHERE idPregunta= ? AND id= ?",
                    [idP,id],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            var puntosAux = rows[0].puntos;
                            if (puntos == -1) {
                                puntosAux--;
                            }
                            if (puntos ==1) {
                                puntosAux++;
                            }
                            connection.query(
                                "UPDATE respuesta SET puntos= ? WHERE idPregunta= ? AND id= ?",
                                [puntosAux, idP, id],
                                function (err, rows) {
                                    connection.release(); // devolver al pool la conexión
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        callback(null, true); //no está el usuario con el password proporcionado
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
    getRespuestaId(id, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM respuesta WHERE idPregunta= ? ORDER BY puntos DESC",
                    [id],
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                var lista = new Array();
                                callback(null, lista);
                            } else {
                                rows.forEach(function (row) {
                                    var fecha = row.fecha.toDateString();
                                    row.fecha = fecha;
                                });
                                callback(null, rows);
                            }
                        }
                    }
                );
            }
        });
    }



    getPreguntasId(id, callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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

    getPreguntas_por_etiqueta(task, callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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

    getPreguntas_por_texto(task, callback) { // preguntar si puede ser un pregunta sin tag
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
                                callback(null, null); //no está el usuario con el password proporcionado
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
                                callback(null, false); //no está el usuario con el password proporcionado
                            } else {
                                var id = rows[0].id;
                                id++;
                                var hoy = moment().format("YYYY-MM-DD");
                                connection.query(
                                    "INSERT INTO pregunta (id,titulo,cuerpo,autor,visitas,puntos, fecha) VALUES (?, ?, ?, ?, ?, ?, ?)",
                                    [id, titulo, cuerpo, email, 0, 0, hoy],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
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
                                            });
                                            connection.release(); // devolver al pool la conexión
                                            callback(null, true);
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
                                "SELECT * FROM respuesta WHERE id = (SELECT MAX(id) FROM respuesta);",
                                [idPregunta],
                                function (err, rows) {
                                    if (err) {
                                        callback(new Error("Error de acceso a la base de datos"));
                                    } else {
                                        if (rows.length != 0) {
                                            var id = rows[0].id;
                                            id++;
                                        }
                                        var hoy = moment().format("YYYY-MM-DD");
                                        connection.query(
                                            "INSERT INTO respuesta (idpregunta,id,texto,autor,puntos,fecha) VALUES (?, ?, ?, ?, ?, ?)",
                                            [idPregunta, id, texto, autor, 0, hoy],
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



    getPuntuado(email, idPregunta, idRespuesta, puntos, callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT  * FROM puntos WHERE idPregunta = ? AND idRespuesta = ? AND user = ?",
                    [idPregunta, idRespuesta, email],
                    function (err, rows) {
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {//si no ha habido voto
                            if (rows.length === 0) {
                                connection.query(
                                    "INSERT INTO puntos (idPregunta,idRespuesta,user,punto) VALUES (?, ?, ?, ?)",
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
                                    "SELECT  * FROM puntos WHERE idPregunta = ? AND idRespuesta = ? AND user = ? AND punto = ?",
                                    [idPregunta, idRespuesta, email, puntos],
                                    function (err, rows) {
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else if (rows.length === 0) {
                                            connection.query(
                                                "UPDATE puntos SET punto = ? WHERE idPregunta = ? AND idRespuesta = ? AND user = ?",                                                
                                                [puntos, idPregunta, idRespuesta, email],
                                                function (err, rows) {
                                                    if (err) {
                                                        callback(new Error("Error de acceso a la base de datos"));
                                                    } else {
                                                        callback(null, "Update");
                                                    }
                                                }
                                            );
                                        } else{//si ya ha puntuado like
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