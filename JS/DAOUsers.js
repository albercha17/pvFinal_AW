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
                    "SELECT * FROM user ORDER BY reputacion DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null);
                            } else {
                                callback(null, rows);
                            }
                        }
                    }
                );
            }
        });
    }

    getUsuarios_filtro(filtro,callback) {
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT * FROM user WHeRE email LIKE '%"+filtro+"%' OR nombre like '%" +filtro+"%' ORDER BY reputacion DESC",
                    function (err, rows) {
                        connection.release(); // devolver al pool la conexión
                        if (err) {
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                            if (rows.length === 0) {
                                callback(null, null);
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
module.exports = DAOUsers