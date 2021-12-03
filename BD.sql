-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-12-2021 a las 12:32:00
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `404`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `etiqueta`
--

CREATE TABLE `etiqueta` (
  `idPregunta` int(11) NOT NULL,
  `tag` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `etiqueta`
--

INSERT INTO `etiqueta` (`idPregunta`, `tag`) VALUES
(1, 'css'),
(1, 'css3'),
(2, 'css'),
(2, 'html'),
(3, 'JavaScript'),
(4, 'nodejs'),
(5, 'mysql'),
(5, 'sql');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallaspregunta`
--

CREATE TABLE `medallaspregunta` (
  `user` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medallasrespuesta`
--

CREATE TABLE `medallasrespuesta` (
  `user` varchar(100) NOT NULL,
  `tipo` varchar(100) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `idPregunta` int(11) NOT NULL,
  `idRespuesta` int(11) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pregunta`
--

CREATE TABLE `pregunta` (
  `id` int(11) NOT NULL,
  `titulo` varchar(100) DEFAULT NULL,
  `cuerpo` text DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `visitas` int(11) DEFAULT 0,
  `puntos` int(11) DEFAULT 0,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `pregunta`
--

INSERT INTO `pregunta` (`id`, `titulo`, `cuerpo`, `autor`, `visitas`, `puntos`, `fecha`) VALUES
(1, '¿Cual es la diferencia entre position: relative, position: absolute y position: fixed?', 'Sé que estas propiedades de CSS sirven para posicionar un elemento dentro de la página. Séque estas propiedades de CSS sirven para posicionar un elemento dentro de la página.', 'nico@404.es', 0, 0, '2021-11-23'),
(2, '¿Cómo funciona exactamente nth-child?', 'No acabo de comprender muy bien que hace exactamente y qué usos prácticos puede tener', 'roberto@404.es', 0, 0, '2021-11-23'),
(3, ' Diferencias entre == y === (comparaciones en JavaScript)', 'Siempre he visto que en JavaScript hay:asignaciones =comparaciones == y ===Creo entender que == hace algo parecido a comparar el valor de la variable y el === tambiéncompara el tipo (como un equals de java).', 'sfg@404.es', 0, 0, '2021-11-23'),
(4, 'Problema con asincronismo en Node', 'Soy nueva en Node... Tengo una modulo que conecta a una BD de postgres por medio de pgnode. En eso no tengo problemas. Mi problema es que al llamar a ese modulo, desde otromodulo, y despues querer usar los datos que salieron de la BD me dice undefined... Estoy casiseguro que es porque la conexion a la BD devuelve una promesa, y los datos no estandisponibles al momento de usarlos.', 'marta@404.es', 0, 0, '2021-11-23'),
(5, '¿Qué es la inyección SQL y cómo puedo evitarla?', 'He encontrado bastantes preguntas en StackOverflow sobre programas o formularios web que guardan información en una base de datos (especialmente en PHP y MySQL) y que contienen graves problemas de seguridad relacionados principalmente con la inyección SQL. Normalmente dejo un comentario y/o un enlace a una referencia externa, pero un comentario no da mucho espacio para mucho y sería positivo que hubiera una referencia interna en SOessobre el tema así que decidí escribir esta pregunta.', 'lucas@404.es', 0, 0, '2021-11-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntospregunta`
--

CREATE TABLE `puntospregunta` (
  `idPregunta` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `punto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntosrespuesta`
--

CREATE TABLE `puntosrespuesta` (
  `idPregunta` int(11) NOT NULL,
  `idRespuesta` int(11) NOT NULL,
  `user` varchar(100) NOT NULL,
  `punto` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `respuesta`
--

CREATE TABLE `respuesta` (
  `idPregunta` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `texto` text DEFAULT NULL,
  `autor` varchar(100) DEFAULT NULL,
  `puntos` int(11) DEFAULT 0,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `respuesta`
--

INSERT INTO `respuesta` (`idPregunta`, `id`, `texto`, `autor`, `puntos`, `fecha`) VALUES
(1, 1, 'La propiedad position sirve para posicionar un elemento dentro de la página. Sin embargo, dependiendo de cual sea la propiedad que usemos, el elemento tomará una referencia u otra para posicionarse respecto a ella.Los posibles valores que puede adoptar la propiedad position son: static | relative | absolute |fixed | inherit | initial.', 'lucas@404.es', 0, '2021-11-23'),
(2, 1, 'La pseudoclase :nth-child() selecciona los hermanos que cumplan cierta condición definida en la fórmula an + b. a y b deben ser números enteros, n es un contador. El grupo an representa un ciclo, cada cuantos elementos se repite; b indica desde donde empezamos a contar.', 'emy@404.es', 0, '2021-11-23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('6Q02KDZ3jcCowQNH2T55WZNM5KAyIF0P', 1638385907, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"identificado\":true,\"nombre\":\"albercha@ucm.es\",\"email\":\"albercha@ucm.es\",\"img\":\"/Imagenes_de_perfil/defecto3.png\"}'),
('OFoyA5XTKE0gi8pgtF6tLRpqAW9K1OyL', 1638617153, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"identificado\":true,\"nombre\":\"albercha@ucm.es\",\"email\":\"albercha@ucm.es\",\"img\":\"/Imagenes_de_perfil/defecto3.png\"}');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `email` varchar(100) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `reputacion` int(11) DEFAULT 1,
  `fechaAlta` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`email`, `password`, `nombre`, `img`, `reputacion`, `fechaAlta`) VALUES
('albercha@ucm.es', 'chavelotodo1', 'albercha@ucm.es', '/Imagenes_de_perfil/defecto3.png', 1, '2021-11-30'),
('emy@404.es', '1234', 'Emy', '/Imagenes_de_perfil/amy.png', 1, '2021-11-23'),
('lucas@404.es', '1234', 'Lucas', '/Imagenes_de_perfil/kuroko.png', 1, '2021-11-23'),
('marta@404.es', '1234', 'Marta', '/Imagenes_de_perfil/marta.png', 1, '2021-11-23'),
('nico@404.es ', '1234', 'Nico', '/Imagenes_de_perfil/nico.png', 1, '2021-11-23'),
('roberto@404.es', '1234', 'Roberto', '/Imagenes_de_perfil/roberto.png', 1, '2021-11-23'),
('sfg@404.es', '1234', 'SFG', '/Imagenes_de_perfil/sfg.png', 1, '2021-11-23');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  ADD PRIMARY KEY (`idPregunta`,`tag`);

--
-- Indices de la tabla `medallaspregunta`
--
ALTER TABLE `medallaspregunta`
  ADD PRIMARY KEY (`user`,`tipo`,`nombre`,`idPregunta`),
  ADD KEY `pregunta_medalla` (`idPregunta`);

--
-- Indices de la tabla `medallasrespuesta`
--
ALTER TABLE `medallasrespuesta`
  ADD PRIMARY KEY (`user`,`tipo`,`nombre`,`idPregunta`,`idRespuesta`),
  ADD KEY `respuesta_medalla` (`idPregunta`,`idRespuesta`);

--
-- Indices de la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD PRIMARY KEY (`id`),
  ADD KEY `autor_pregunta` (`autor`);

--
-- Indices de la tabla `puntospregunta`
--
ALTER TABLE `puntospregunta`
  ADD PRIMARY KEY (`idPregunta`,`user`),
  ADD KEY `autor_p_r` (`user`);

--
-- Indices de la tabla `puntosrespuesta`
--
ALTER TABLE `puntosrespuesta`
  ADD PRIMARY KEY (`idPregunta`,`idRespuesta`,`user`),
  ADD KEY `puntosR_de` (`user`);

--
-- Indices de la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD PRIMARY KEY (`idPregunta`,`id`),
  ADD KEY `autor_respuesta` (`autor`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`email`);

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `etiqueta`
--
ALTER TABLE `etiqueta`
  ADD CONSTRAINT `etiqueta_de` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallaspregunta`
--
ALTER TABLE `medallaspregunta`
  ADD CONSTRAINT `autorMedallaP` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `pregunta_medalla` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `medallasrespuesta`
--
ALTER TABLE `medallasrespuesta`
  ADD CONSTRAINT `autor_respuestaP` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `respuesta_medalla` FOREIGN KEY (`idPregunta`,`idRespuesta`) REFERENCES `respuesta` (`idPregunta`, `id`);

--
-- Filtros para la tabla `pregunta`
--
ALTER TABLE `pregunta`
  ADD CONSTRAINT `autor_pregunta` FOREIGN KEY (`autor`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntospregunta`
--
ALTER TABLE `puntospregunta`
  ADD CONSTRAINT `pr_puntos` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `puntosP_de` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `puntosrespuesta`
--
ALTER TABLE `puntosrespuesta`
  ADD CONSTRAINT `puntosR_de` FOREIGN KEY (`user`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `r_puntos` FOREIGN KEY (`idPregunta`,`idRespuesta`) REFERENCES `respuesta` (`idPregunta`, `id`);

--
-- Filtros para la tabla `respuesta`
--
ALTER TABLE `respuesta`
  ADD CONSTRAINT `autor_respuesta` FOREIGN KEY (`autor`) REFERENCES `user` (`email`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `preguntaID` FOREIGN KEY (`idPregunta`) REFERENCES `pregunta` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
