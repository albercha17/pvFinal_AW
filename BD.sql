create table user(email VARCHAR(100), password VARCHAR(100),nombre VARCHAR(100), img VARCHAR(100), reputacion int(11),fechaAlta Date ,PRIMARY KEY(email));
insert into user values('nico@404.es ','1234','Nico','/Imagenes_de_perfil/nico.png','1','2021-11-23');
insert into user values('roberto@404.es','1234','Roberto','/Imagenes_de_perfil/roberto.png','1','2021-11-23');
insert into user values('sfg@404.es','1234','SFG','/Imagenes_de_perfil/sfg.png','1','2021-11-23');
insert into user values('marta@404.es','1234','Marta','/Imagenes_de_perfil/marta.png','1','2021-11-23');
insert into user values('lucas@404.es','1234','Lucas','/Imagenes_de_perfil/kuroko.png','1','2021-11-23');
insert into user values('emy@404.es','1234','Emy','/Imagenes_de_perfil/amy.png','1','2021-11-23');

create table pregunta(id int(11), titulo VARCHAR(100), cuerpo text, autor VARCHAR(100),visitas int(11),puntos int(11),fecha Date ,PRIMARY KEY(id));
insert into pregunta values('1','¿Cual es la diferencia entre position: relative, position: absolute y position: fixed?'
,'Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página. Séque estas propiedades de CSS sirven para posicionar un elemento dentro de la página.',
'nico@404.es','0','0','2021-11-23');
insert into pregunta values('2','¿Cómo funciona exactamente nth-child?','No acabo de comprender muy bien que hace exactamente y qué usos prácticos puede tener',
'roberto@404.es','0','0','2021-11-23');
insert into pregunta values('3',' Diferencias entre == y === (comparaciones en JavaScript)','Siempre he visto que en JavaScript hay:asignaciones =comparaciones == y ===Creo entender que == hace algo parecido a comparar el valor de la variable y el === tambiéncompara el tipo (como un equals de java).',
'sfg@404.es','0','0','2021-11-23');
insert into pregunta values('4','Problema con asincronismo en Node','Soy nueva en Node... Tengo una modulo que conecta a una BD de postgres por medio de pgnode. En eso no tengo problemas. Mi problema es que al llamar a ese modulo, desde otromodulo, y despues querer usar los datos que salieron de la BD me dice undefined... Estoy casiseguro que es porque la conexion a la BD devuelve una promesa, y los datos no estandisponibles al momento de usarlos.',
'marta@404.es','0','0','2021-11-23');
insert into pregunta values('5','¿Qué es la inyección SQL y cómo puedo evitarla?','He encontrado bastantes preguntas en StackOverflow sobre programas o formularios web que guardan información en una base de datos (especialmente en PHP y MySQL) y que contienen graves problemas de seguridad relacionados principalmente con la inyección SQL. Normalmente dejo un comentario y/o un enlace a una referencia externa, pero un comentario no da mucho espacio para mucho y sería positivo que hubiera una referencia interna en SOessobre el tema así que decidí escribir esta pregunta.',
'lucas@404.es','0','0','2021-11-23');


create table etiqueta(idPregunta int(11), tag VARCHAR(100) ,PRIMARY KEY(idPregunta, tag));
insert into etiqueta values('1','css');
insert into etiqueta values('1','css3');
insert into etiqueta values('2','css');
insert into etiqueta values('2','html');
insert into etiqueta values('3','JavaScript');
insert into etiqueta values('4','nodejs');
insert into etiqueta values('5','mysql');
insert into etiqueta values('5','sql');

create table respuesta(idPregunta int(11),id int(11), texto text, autor VARCHAR(100),puntos int(11), fecha Date ,PRIMARY KEY(idPregunta,id));
insert into respuesta values('1','1','La propiedad position sirve para posicionar un elemento dentro de la página. Sin embargo, dependiendo de cual sea la propiedad que usemos, el elemento tomará una referencia u otra para posicionarse respecto a ella.Los posibles valores que puede adoptar la propiedad position son: static | relative | absolute |fixed | inherit | initial.',
'lucas@404.es','0','2021-11-23');
insert into respuesta values('2','1','La pseudoclase :nth-child() selecciona los hermanos que cumplan cierta condición definida en la fórmula an + b. a y b deben ser números enteros, n es un contador. El grupo an representa un ciclo, cada cuantos elementos se repite; b indica desde donde empezamos a contar.',
'emy@404.es','0','2021-11-23');

create table puntos(idPregunta int(11), idRespuesta int(11), user VARCHAR(100), punto tinyint(1),PRIMARY KEY(idPregunta,user));
insert into puntos values('1','0','roberto@404.es','1');

create table medallas(user VARCHAR(100), tipo VARCHAR(100),nombre VARCHAR(100),fecha Date ,PRIMARY KEY(fecha,user));
insert into medallas values('roberto@404.es','bronce','Estudiante','2020-11-23');