"use strict";

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
                        "SELECT * FROM pregunta T, etiqueta a WHERE T.id=a.idPregunta",
                        function (err, rows) {
                            connection.release(); // devolver al pool la conexión
                            if (err) {
                                callback(new Error("Error de acceso a la base de datos"));
                            } else {
                                if (rows.length === 0) {
                                    callback(null, null); //no está el usuario con el password proporcionado
                                } else {
                                    var listaP = new Array();
                                    var i=0;
                                    while(i<rows.length) {
                                        var listaTags = new Array();
                                        var pregunta = new Object();
                                        var tag = new Object();
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
                                     listaP.push (pregunta)
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

    }
    module.exports = DAOPreguntas