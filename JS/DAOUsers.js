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
                                callback(null, null); 
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
                                callback(null, null); 
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
                                
                                callback(null, reputacion);
                            }
                        }
                    }
                }
                );
            }
        });
    }

    

    insertUser(email, password, nombre, img, callback) { 
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
                                    "INSERT INTO user (email,password,nombre,img,fechaAlta) VALUES (?, ?, ?, ?, ?)",
                                    [email, password, nombre, img, hoy],
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
    getMedallaBronce(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT nombre FROM medallasPregunta WHERE user = ? AND tipo= ?",
                    [email, "bronce"],
                    function (err, rows) {
                        if (err) {
                            connection.release(); // devolver al pool la conexión
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                                listaMedallas= rows;
                                connection.query(
                                    "SELECT nombre FROM medallasRespuesta WHERE user = ? AND tipo= ?",
                                    [email, "bronce"],
                                    function (err, rows2) {
                                        connection.release(); // devolver al pool la conexión
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                                listaMedallas = listaMedallas.concat(rows2);
                                                callback(null,listaMedallas);
                                        }
                                    }
                                );
                        }
                    }
                );
            }
        });
    }

    getMedallaPlata(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT nombre FROM medallasPregunta WHERE user = ? AND tipo= ?",
                    [email, "plata"],
                    function (err, rows) {
                        if (err) {
                            connection.release(); // devolver al pool la conexión
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                                listaMedallas= rows;
                                connection.query(
                                    "SELECT nombre FROM medallasRespuesta WHERE user = ? AND tipo= ?",
                                    [email, "plata"],
                                    function (err, rows2) {
                                        connection.release(); // devolver al pool la conexión
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                                listaMedallas = listaMedallas.concat(rows2);
                                                callback(null,listaMedallas);
                                        }
                                    }
                                );
                        }
                    }
                );
            }
        });
    }

    getMedallaOro(email, callback) {
        var listaMedallas= new Array();
        this.pool.getConnection(function (err, connection) {
            if (err) {
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                connection.query(
                    "SELECT nombre FROM medallasPregunta WHERE user = ? AND tipo= ?",
                    [email, "oro"],
                    function (err, rows) {
                        if (err) {
                            connection.release(); // devolver al pool la conexión
                            callback(new Error("Error de acceso a la base de datos"));
                        } else {
                                listaMedallas= rows;
                                connection.query(
                                    "SELECT nombre FROM medallasRespuesta WHERE user = ? AND tipo= ?",
                                    [email, "oro"],
                                    function (err, rows2) {
                                        connection.release(); // devolver al pool la conexión
                                        if (err) {
                                            callback(new Error("Error de acceso a la base de datos"));
                                        } else {
                                                listaMedallas = listaMedallas.concat(rows2);
                                                callback(null,listaMedallas);
                                        }
                                    }
                                );
                        }
                    }
                );
            }
        });
    }

    obtenerImagen(id, callback) {
        this.pool.getConnection(function(err, con) {
        if (err)
        callback(err);
        else {
        let sql = "SELECT img FROM user WHERE email = ?";
        con.query(sql, [id], function(err, result) {
        con.release();
        if (err) {
        callback(err);
        } else
        // Comprobar si existe una persona con el Id dado.
        if (result.length === 0)
        callback("No existe");
        else
        callback(null, result[0].img);
        });
        }
        });
        }
        
}
module.exports = DAOUsers