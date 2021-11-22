"use strict";

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
                    "SELECT * FROM pregunta",
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


        getRespuesta(id, callback) {
            this.pool.getConnection(function (err, connection) {
                if (err) {
                    callback(new Error("Error de conexión a la base de datos"));
                } else {
                    connection.query(
                        "SELECT * FROM respuesta WHERE idPregunta = ?",
                        [id],
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