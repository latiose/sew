-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-12-2024 a las 16:43:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `f1`
--
CREATE DATABASE IF NOT EXISTS `f1` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `f1`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `coches`
--

CREATE TABLE IF NOT EXISTS `coches` (
  `id_coche` int(11) NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) NOT NULL,
  `año_modelo` int(11) NOT NULL,
  `Chasis` varchar(32) NOT NULL,
  `velocidad_max` decimal(5,2) NOT NULL,
  `potencia_motor` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  PRIMARY KEY (`id_coche`),
  KEY `fk_equipocoche` (`id_equipo`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `coches`
--

INSERT INTO `coches` (`id_coche`, `modelo`, `año_modelo`, `Chasis`, `velocidad_max`, `potencia_motor`, `id_equipo`) VALUES
(1, 'RB19', 2023, 'CF-123', 350.00, 1050, 1),
(2, 'W14', 2023, 'CF-234', 340.00, 1020, 2),
(3, 'SF-23', 2023, 'CF-345', 345.00, 1035, 3),
(4, 'MC23', 2023, 'CF-456', 342.00, 1025, 4),
(5, 'AMR23', 2023, 'CF-567', 343.00, 1030, 5),
(6, 'A523', 2023, 'CF-678', 341.00, 1015, 6),
(7, 'AT04', 2023, 'CF-789', 340.00, 1010, 7),
(8, 'C43', 2023, 'CF-890', 342.00, 1005, 8),
(9, 'VF-23', 2023, 'CF-901', 340.00, 1000, 9),
(10, 'FW45', 2023, 'CF-012', 338.00, 995, 10),
(11, 'RB18', 2022, 'CF-345', 348.00, 1045, 1),
(12, 'W13', 2022, 'CF-456', 338.00, 1010, 2),
(13, 'F1-75', 2022, 'CF-567', 344.00, 1030, 3),
(14, 'MC22', 2022, 'CF-678', 340.00, 1020, 4),
(15, 'AMR22', 2022, 'CF-789', 342.00, 1015, 5),
(16, 'A522', 2022, 'CF-890', 339.00, 1005, 6),
(17, 'AT03', 2022, 'CF-901', 338.00, 1000, 7),
(18, 'C42', 2022, 'CF-012', 340.00, 995, 8),
(19, 'VF-22', 2022, 'CF-123', 339.00, 990, 9),
(20, 'FW44', 2022, 'CF-234', 337.00, 985, 10),
(21, 'RB16B', 2021, 'CF-345', 350.00, 1050, 1),
(22, 'W12', 2021, 'CF-456', 340.00, 1005, 2),
(23, 'SF21', 2021, 'CF-567', 345.00, 1030, 3),
(24, 'MC21', 2021, 'CF-678', 342.00, 1015, 4),
(25, 'AMR21', 2021, 'CF-789', 343.00, 1010, 5),
(26, 'A521', 2021, 'CF-890', 339.00, 1000, 6),
(27, 'AT02', 2021, 'CF-901', 338.00, 995, 7),
(28, 'C41', 2021, 'CF-012', 340.00, 990, 8),
(29, 'VF-21', 2021, 'CF-123', 338.00, 985, 9),
(30, 'FW43B', 2021, 'CF-234', 336.00, 980, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE IF NOT EXISTS `equipos` (
  `id_equipo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(32) NOT NULL,
  `pais_origen` varchar(32) NOT NULL,
  PRIMARY KEY (`id_equipo`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equipo`, `nombre`, `pais_origen`) VALUES
(1, 'Red Bull', 'Austria'),
(2, 'Mercedes', 'Alemania'),
(3, 'Ferrari', 'Italia'),
(4, 'McLaren', 'Reino Unido'),
(5, 'Aston Martin', 'Reino Unido'),
(6, 'Alpine', 'Francia'),
(7, 'AlphaTauri', 'Italia'),
(8, 'Alfa Romeo', 'Suiza'),
(9, 'Haas', 'Estados Unidos'),
(10, 'Williams', 'Reino Unido');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pilotos`
--

CREATE TABLE IF NOT EXISTS `pilotos` (
  `id_piloto` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(32) NOT NULL,
  `Apellido` varchar(32) NOT NULL,
  `Nacionalidad` varchar(32) NOT NULL,
  `Fecha_Nacimiento` date NOT NULL,
  PRIMARY KEY (`id_piloto`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pilotos`
--

INSERT INTO `pilotos` (`id_piloto`, `Nombre`, `Apellido`, `Nacionalidad`, `Fecha_Nacimiento`) VALUES
(1, 'Max', 'Verstappen', 'Holanda', '1997-09-30'),
(2, 'Lewis', 'Hamilton', 'Reino Unido', '1985-01-07'),
(3, 'Charles', 'Leclerc', 'Monaco', '1997-10-16'),
(4, 'Sergio', 'Pérez', 'México', '1990-01-26'),
(5, 'Lando', 'Norris', 'Reino Unido', '1999-11-13'),
(6, 'Fernando', 'Alonso', 'España', '1981-07-29'),
(7, 'Esteban', 'Ocon', 'Francia', '1996-09-17'),
(8, 'Pierre', 'Gasly', 'Francia', '1996-02-07'),
(9, 'Valtteri', 'Bottas', 'Finlandia', '1989-08-28'),
(10, 'George', 'Russell', 'Reino Unido', '1998-02-15'),
(11, 'Carlos', 'Sainz', 'España', '1994-09-01'),
(12, 'Oscar', 'Piastri', 'Australia', '2001-04-06'),
(13, 'Kevin', 'Magnussen', 'Dinamarca', '1992-10-05'),
(14, 'Nico', 'Hülkenberg', 'Alemania', '1987-08-19'),
(15, 'Yuki', 'Tsunoda', 'Japón', '2000-05-11'),
(16, 'Logan', 'Sargeant', 'Estados Unidos', '2000-12-31'),
(17, 'Alexander', 'Albon', 'Tailandia', '1996-03-23'),
(18, 'Lance', 'Stroll', 'Canadá', '1998-10-29'),
(19, 'Nyck', 'de Vries', 'Holanda', '1995-02-06'),
(20, 'Daniel', 'Ricciardo', 'Australia', '1989-07-01'),
(21, 'Zhou', 'Guanyu', 'China', '1999-05-30'),
(22, 'Mick', 'Schumacher', 'Alemania', '1999-03-22'),
(23, 'Nicholas', 'Latifi', 'Canadá', '1995-06-29'),
(24, 'Sebastian', 'Vettel', 'Alemania', '1987-07-03'),
(25, 'Daniel', 'Ricciardo', 'Australia', '1989-07-01'),
(26, 'Alex', 'Albon', 'Tailandia', '1996-03-23'),
(27, 'Nico', 'Hülkenberg', 'Alemania', '1987-08-19'),
(28, 'Robert', 'Kubica', 'Polonia', '1984-12-07'),
(29, 'Antonio', 'Giovinazzi', 'Italia', '1993-12-14'),
(30, 'Kimi', 'Räikkönen', 'Finlandia', '1979-10-17'),
(31, 'Liam', 'Lawson', 'Australia', '2002-02-11'),
(32, 'Nikita', 'Mazepin', 'Rusia', '1999-03-02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `resultados`
--

CREATE TABLE IF NOT EXISTS `resultados` (
  `id_resultado` int(11) NOT NULL AUTO_INCREMENT,
  `id_temporada` int(11) NOT NULL,
  `id_piloto` int(11) NOT NULL,
  `id_equipo` int(11) NOT NULL,
  `puntos` int(11) NOT NULL,
  `posicion` int(11) NOT NULL,
  PRIMARY KEY (`id_resultado`),
  KEY `fk_equipo` (`id_equipo`),
  KEY `fk_piloto` (`id_piloto`),
  KEY `fk_temporada` (`id_temporada`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `resultados`
--

INSERT INTO `resultados` (`id_resultado`, `id_temporada`, `id_piloto`, `id_equipo`, `puntos`, `posicion`) VALUES
(1, 1, 1, 1, 395, 1),
(2, 1, 2, 2, 387, 2),
(3, 1, 9, 2, 226, 3),
(4, 1, 4, 1, 190, 4),
(5, 1, 11, 3, 164, 5),
(6, 1, 5, 4, 160, 6),
(7, 1, 3, 3, 159, 7),
(8, 1, 20, 4, 115, 8),
(9, 1, 8, 7, 110, 9),
(10, 1, 6, 6, 81, 10),
(11, 1, 7, 6, 74, 11),
(12, 1, 24, 5, 43, 12),
(13, 1, 18, 5, 34, 13),
(14, 1, 15, 7, 32, 14),
(15, 1, 10, 10, 16, 15),
(16, 1, 30, 8, 10, 16),
(17, 1, 23, 10, 7, 17),
(18, 1, 29, 8, 3, 18),
(19, 1, 22, 9, 0, 19),
(20, 1, 32, 9, 0, 20),
(21, 1, 28, 8, 0, 21),
(22, 2, 1, 1, 454, 1),
(23, 2, 3, 3, 308, 2),
(24, 2, 4, 1, 305, 3),
(25, 2, 10, 2, 275, 4),
(26, 2, 11, 3, 246, 5),
(27, 2, 2, 2, 240, 6),
(28, 2, 5, 4, 122, 7),
(29, 2, 7, 6, 92, 8),
(30, 2, 6, 6, 81, 9),
(31, 2, 9, 8, 49, 10),
(32, 2, 20, 4, 37, 11),
(33, 2, 24, 5, 37, 12),
(34, 2, 13, 9, 25, 13),
(35, 2, 8, 7, 23, 14),
(36, 2, 18, 5, 18, 15),
(37, 2, 22, 9, 12, 16),
(38, 2, 15, 7, 12, 17),
(39, 2, 21, 8, 6, 18),
(40, 2, 26, 10, 4, 19),
(41, 2, 23, 10, 2, 20),
(42, 2, 19, 10, 2, 21),
(43, 2, 27, 5, 0, 22),
(44, 3, 1, 1, 575, 1),
(45, 3, 4, 1, 285, 2),
(46, 3, 2, 2, 234, 3),
(47, 3, 6, 5, 206, 4),
(48, 3, 3, 3, 206, 5),
(49, 3, 5, 4, 205, 6),
(50, 3, 11, 3, 200, 7),
(51, 3, 10, 2, 175, 8),
(52, 3, 12, 4, 97, 9),
(53, 3, 18, 5, 74, 10),
(54, 3, 8, 6, 62, 11),
(55, 3, 7, 6, 58, 12),
(56, 3, 26, 10, 27, 13),
(57, 3, 15, 7, 17, 14),
(58, 3, 9, 8, 10, 15),
(59, 3, 24, 9, 9, 16),
(60, 3, 20, 7, 6, 17),
(61, 3, 21, 8, 6, 18),
(62, 3, 13, 9, 3, 19),
(63, 3, 31, 7, 2, 20),
(64, 3, 16, 10, 1, 21),
(65, 3, 19, 7, 0, 22);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporadas`
--

CREATE TABLE IF NOT EXISTS `temporadas` (
  `id_temporada` int(11) NOT NULL AUTO_INCREMENT,
  `Año` int(11) NOT NULL,
  `Campeon` varchar(100) NOT NULL,
  `Numero_Carreras` int(11) NOT NULL,
  PRIMARY KEY (`id_temporada`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temporadas`
--

INSERT INTO `temporadas` (`id_temporada`, `Año`, `Campeon`, `Numero_Carreras`) VALUES
(1, 2021, 'Max Verstappen', 22),
(2, 2022, 'Max Verstappen', 22),
(3, 2023, 'Max Verstappen', 23);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
