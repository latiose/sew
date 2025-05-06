-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-12-2024 a las 12:36:10
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
-- Base de datos: `records`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `registro`
--

DROP TABLE IF EXISTS `registro`;
CREATE TABLE `registro` (
  `nombre` varchar(32) NOT NULL,
  `apellidos` varchar(32) NOT NULL,
  `nivel` varchar(32) NOT NULL,
  `tiempo` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `registro`
--

INSERT INTO `registro` (`nombre`, `apellidos`, `nivel`, `tiempo`) VALUES
('fgh', 'fgh', '0.2', 0.123),
('fgh', 'fgh', '0.2', 0.111),
('ghj', 'ghj', '0.5', 0.199),
('jkl', 'kjl', '0.2', 0.102),
('bnmj', 'mnb', '0.5', 0.132),
('hgj', 'ghj', '0.5', 0.086),
('jkhkjkhj', 'hjkhjk', '0.5', 0.069),
('ghj', 'ghj', '0.8', 0.141),
('nbm', 'nbm', '0.8', 0.12),
('m,.', 'm,.', '0.8', 0.153),
('bnm', 'bnm', '0.8', 0.217),
('bnm,', 'nm,', '0.8', 0.141),
('hgj', 'ghj', '0.8', 0.197),
('m,.', 'm,.', '0.2', 0.181),
('fgh', 'fgh', '0.5', 0.094),
('mn,', 'nm,', '0.8', 0.192),
('bnm', 'bnm', '0.5', 0.163),
('jkl', 'kjl', '0.2', 0.181),
('df', 'hdf', '0.2', 0.164),
('vbc', 'cvb', '0.5', 0.066),
('nm,', 'mn,', '0.5', 0.131),
('kl', 'jkl', '0.5', 0.129),
('m,.', 'm,.', '0.5', 0.184),
('dfg', 'dfg', '0.5', 0.117),
('dfg', 'dfg', '0.5', 0.13),
('bnm', 'bnm', '0.2', 0.16),
('nm,', 'nm,', '0.8', 0.183),
('hfg', 'fgh', '0.8', 0.167),
('ghj', 'gjh', '0.5', 0.063),
('dfg', 'dfg', '0.5', 0.154),
('ghn', 'ghn', '0.8', 0.217),
('fgh', 'fgh', '0.8', 0.128),
('hj,', 'jh,', '0.2', 0.108),
('ghn', 'ghn', '0.8', 0.252),
('nm,', 'nm,', '0.2', 0.16),
('ghm', 'ghm', '0.2', 0.122),
('hjm', 'hjm', '0.8', 0.146),
('dfg', 'dfg', '0.8', 4.844),
('fgh', 'fgh', '0.8', 0.096),
('ghj', 'ghj', '0.8', 0.091),
('dfhg', 'h', '0.2', 0.145),
('ghj', 'ghj', '0.8', 0.414),
('hgj', 'ghj', '0.5', 0.116),
('fgh', 'fgh', '0.5', 0.158),
('fgh', 'fgh', '0.2', 0.032),
('fgh', 'fgh', '0.5', 0.147),
('hgj', 'ghj', '0.2', 0.185),
('ghj', 'hgj', '0.8', 0.229),
('ghj', 'ghj', '0.8', 0.181),
('ghj', 'ghj', '0.2', 0.057),
('lñk', 'klñ', '0.8', 0.149),
('ghj', 'ghj', '0.2', 0.026),
('fgh', 'fgh', '0.5', 0.144),
('ghj', 'jgh', '0.5', 0.086),
('nm,', 'nm,', '0.5', 0.108),
('mn,', 'nm,', '0.5', 0.28),
('vbn', 'vbn', '0.2', 0.142),
('vbn', 'bvn', '0.2', 0.04),
('bnm', 'bnm', '0.2', 0.073),
('bnm', 'bnm', '0.2', 0.093),
('bnm', 'bnm', '0.5', 0.109),
('gfh', 'gfh', '0.5', 0.125),
('dfg', 'fdg', '0.8', 0.201),
('kjl', 'jkl', '0.2', 0.109),
('jhk', 'jhk', '0.2', 0.098),
('jm', 'hjm', '0.2', 0.145),
('hgn', 'hgn', '0.2', 0.17),
('gfh', 'fgh', '0.5', 0.139),
('hjk', 'hjk', '0.2', 0.022),
('lj', 'hjl', '0.2', 0.172),
('nk', 'jhk', '0.8', 3.4),
('bnv', 'bvn', '0.5', 0.081),
('jkl', 'jkl', '0.2', 0.091),
('hjk', 'hjk', '0.5', 0.086),
('fdg', 'fgdf', '0.8', 0.237),
('fgh', 'fgh', '0.8', 0.196),
('ghj', 'ghj', '0.8', 0.112),
('fgh', 'fhg', '0.8', 0.218),
('ghj', 'ghj', '0.5', 0.223),
('tery', 'rty', '0.8', 0.34),
('jkl', 'jkl', '0.2', 0.116),
('dfg', 'dfg', '0.2', 0.088),
('gfg', 'ghjjh', '0.8', 0.139),
('hgj', 'hjk', '0.8', 0.134),
('fgd', 'dfg', '0.8', 0.31),
('ghj', 'ghj', '0.2', 0.153),
('jhk', 'hjk', '0.5', 0.206),
('fgh', 'fgh', '0.5', 0.139),
('jkl', 'jkl', '0.5', 0.591),
('hjk', 'hjk', '0.8', 0.158),
('hjgk', 'hjk', '0.2', 0.184),
('jhk', 'hjk', '0.2', 0.039),
('hjk', 'hjk', '0.8', 0.253),
('hjk', 'hjk', '0.8', 0.175),
('hgbj', 'ghj', '0.2', 0.035),
('jkhl', 'jkl', '0.5', 0.379),
('lkñ', 'klñ', '0.5', 0.094),
('hjk', 'hjk', '0.5', 0.151),
('jhkl', 'jkl', '0.2', 0.034),
('hjk', 'hjk', '0.5', 0.149),
('jkl', 'jkl', '0.2', 0.077),
('kjl', 'jkl', '0.8', 0.217),
('jkl', 'jkl', '0.5', 0.122),
('jhk', 'hjk', '0.8', 0.124),
('hjk', 'hjk', '0.5', 0.178),
('cvb', 'cvb', '0.2', 0.064),
('hgj', 'gjh', '0.2', 0.122),
('ghj', 'ghj', '0.8', 0.226),
('jhk', 'hjk', '0.5', 0.15),
('hjk', 'khj', '0.8', 0.304),
('hjk', 'hjk', '0.5', 0.241),
('jkl', 'jkl', '0.2', 0.116),
('hjk', 'hjk', '0.8', 0.237),
('ghj', 'ghj', '0.2', 0.086),
('ghj', 'ghj', '0.2', 0.085),
('asd', 'asd', '0.5', 0.07),
('ghj', 'ghj', '0.8', 0.417),
('jkl', 'jkl', '0.8', 0.149),
('jhk', 'hjk', '0.2', 0.083),
('ljk', 'jkl', '0.2', 0.063),
('hjk', 'jhk', '0.2', 0.19),
('ghj', 'hgj', '0.5', 0.13),
('hjk', 'hjk', '0.5', 0.096),
('dfg', 'dfg', '0.2', 0.102),
('fgh', 'fgh', '0.8', 0.106),
('dfg', 'dfg', '0.8', 26.053),
('ghj', 'ghj', '0.2', 0.366),
('hjm', 'hjm', '0.8', 0.148),
('kj,', 'jk,', '0.8', 0.088),
('hjm', 'hjm', '0.5', 0.074),
('hjk', 'hjk', '0.2', 0.099),
('ghj', 'hgj', '0.5', 0.148),
('hjk', 'jhk', '0.8', 0.089),
('ghj', 'jhk', '0.5', 0.053),
('hjm', 'hjm', '0.2', 0.025),
('ghj', 'ghj', '0.8', 0.186),
('ghj', 'ghj', '0.5', 0.205),
('hgj', 'ghj', '0.8', 0.241),
('hjk', 'hjk', '0.2', 0.113),
('hgj', 'hgj', '0.5', 0.066),
('dfg', 'dfg', '0.2', 0.042),
('ghj', 'ghj', '0.2', 0.854),
('dfg', 'dfg', '0.5', 0.885),
('tyj', 'tyj', '0.8', 0.189),
('vbn', 'vbn', '0.5', 2.048),
('hgj', 'ghj', '0.2', 2.015);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
