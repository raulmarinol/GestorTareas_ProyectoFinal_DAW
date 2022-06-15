-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.7.3-MariaDB-1:10.7.3+maria~focal - mariadb.org binary distribution
-- SO del servidor:              debian-linux-gnu
-- HeidiSQL Versión:             11.1.0.6116
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para proyectoDAW
CREATE DATABASE IF NOT EXISTS `proyectoDAW` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `proyectoDAW`;

-- Volcando estructura para tabla proyectoDAW.empresas
CREATE TABLE IF NOT EXISTS `empresas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `dirrecion` varchar(255) NOT NULL,
  `nombre_empresa` varchar(255) NOT NULL,
  `telefono` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_iydnt6e2dg2q3730vtxraqx5q` (`dirrecion`),
  UNIQUE KEY `UK_94m0riurgg5a5gwyipnsamuys` (`nombre_empresa`),
  UNIQUE KEY `UK_3rf8qweo0almrxcyrl4mlgq2l` (`telefono`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla proyectoDAW.empresas: ~1 rows (aproximadamente)
/*!40000 ALTER TABLE `empresas` DISABLE KEYS */;
REPLACE INTO `empresas` (`id`, `dirrecion`, `nombre_empresa`, `telefono`) VALUES
	(1, 'C. Luis de Morales, 32, 41018 Sevilla', 'Applus+', 654789321),
	(2, 'C/ Gonzalo Jiménez de Quesada n2º pl, 7ª Ed, 41092 Torre', 'NTT DATA2', 954466063),
	(6, 'Avenida Kansas City, 9 Edif. Realia, Mód. 3-6 41007 Sevilla2 ', 'Atos: España2', 955512108),
	(7, 'Torre Remedios Business Center Avda. República Argentina, 24. 3ª planta 41011', 'Dedalus Spain', 954785412);
/*!40000 ALTER TABLE `empresas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoDAW.tareas
CREATE TABLE IF NOT EXISTS `tareas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `regist_date` date NOT NULL,
  `tarea_desarrollada` varchar(200) NOT NULL,
  `regist_time` double NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrkiv9y7ymtwevrle1chy9k47h` (`user_id`),
  CONSTRAINT `FKrkiv9y7ymtwevrle1chy9k47h` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla proyectoDAW.tareas: ~6 rows (aproximadamente)
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
REPLACE INTO `tareas` (`id`, `regist_date`, `tarea_desarrollada`, `regist_time`, `user_id`) VALUES
	(1, '2022-12-01', 'prueba23', 7, 2),
	(3, '2022-12-01', 'prueba', 6, 2),
	(4, '2022-06-09', 'prueba25 edit bien', 10, 8),
	(5, '2022-06-12', 'Tarea de prueba modificación base de datos', 5, 8),
	(6, '2020-01-01', '1', 10, 8),
	(7, '2022-06-11', 'Tarea de prueba modificación base de datos2', 5, 8),
	(8, '2022-06-14', 'prueba con carlos', 8.5, 8),
	(9, '2022-06-21', 'Realización de la bbdd para el proyecto final de modulo', 8, 2);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;

-- Volcando estructura para tabla proyectoDAW.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `sur_name` varchar(20) NOT NULL,
  `profesor_reponsable` bigint(20) DEFAULT NULL,
  `tutor_reponsable` bigint(20) DEFAULT NULL,
  `empresa_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ob8kqyqqgmefl0aco34akdtpe` (`email`),
  KEY `FKmytf8d0ya38gt41pdc4yca7gh` (`empresa_id`),
  CONSTRAINT `FKmytf8d0ya38gt41pdc4yca7gh` FOREIGN KEY (`empresa_id`) REFERENCES `empresas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla proyectoDAW.user: ~20 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
REPLACE INTO `user` (`id`, `active`, `email`, `foto`, `name`, `password`, `phone`, `rol`, `sur_name`, `profesor_reponsable`, `tutor_reponsable`, `empresa_id`) VALUES
	(1, NULL, 'admin@admin.com', NULL, 'admin', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', NULL, 'ADMIN', 'admini', NULL, NULL, NULL),
	(2, b'1', 'raulmarinoh@gmail.com', NULL, 'Raúl', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666555444', 'ALUMNO', 'Mariño López', 19, 5, 6),
	(3, b'1', 'alejandro@profe.com', NULL, 'Alejandro', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666222111', 'PROFESOR', 'Cardo Grau2', NULL, NULL, NULL),
	(4, b'1', 'Diana@profe.com', NULL, 'Diana', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666999888', 'PROFESOR', 'Rey Profe', NULL, NULL, NULL),
	(5, b'1', 'carmen@tutor.com', NULL, 'Carmen', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666555444', 'TUTOR', 'Barrios', NULL, NULL, NULL),
	(7, b'1', 'antonio@tutor.com', NULL, 'Antonio', '$2a$12$A3iItePrsgo2z.PNR.at7OUdhgdvJbu.qN0CiHxGfPxXHvkR7Ysei', '666547895', 'TUTOR', 'Fernandez', NULL, NULL, NULL),
	(8, b'1', 'carlos@alum.com', NULL, 'Carlos', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '565478954', 'ALUMNO', 'Puyana', 3, 5, 2),
	(9, b'1', 'alicia@alum.com', NULL, 'Alicia', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666999777', 'ALUMNO', 'Acosta', NULL, NULL, 2),
	(10, b'1', 'oscar@alum.com', NULL, 'Oscar ', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666222888', 'ALUMNO', 'Casanova', 19, NULL, NULL),
	(11, b'1', 'ivalienteg@gmail.com', NULL, 'Ines', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666666666', 'ALUMNO', 'Valiente', NULL, NULL, 1),
	(12, b'1', 'pepe@alum.com', NULL, 'Pepe', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666555666', 'ALUMNO', 'López', NULL, NULL, NULL),
	(13, b'1', 'guillermo@gmail.com', NULL, 'Guillermo', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '547896321', 'ALUMNO', 'Sanchez', NULL, NULL, NULL),
	(14, b'1', 'claudia@gmail.com', NULL, 'Claudia', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '879654123', 'ALUMNO', 'Martinez', NULL, NULL, NULL),
	(15, b'1', 'elena@gmail.com', NULL, 'Elena', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666111222', 'ALUMNO', 'López', NULL, NULL, NULL),
	(16, b'1', 'marisol@gmail.com', NULL, 'Mari Sol', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '555888111', 'ALUMNO', 'Ramirez', NULL, NULL, NULL),
	(17, b'1', 'susana@gmail.com', NULL, 'Susana', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '626407074', 'ALUMNO', 'Susanita', NULL, NULL, NULL),
	(18, b'1', 'raulmarinoh1@gmail.com', NULL, 'Raúl34', '$2a$15$wO5GoPf7/UfDVaOqbNjo1OFuoRfpd.3iFjYIFKL3yENzj/YnHzhQW', '626407081', 'ALUMNO', 'Mariño López', NULL, NULL, NULL),
	(19, b'1', 'chema@profe', NULL, 'Chema', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666777123', 'PROFESOR', 'Durán', NULL, NULL, NULL),
	(20, b'1', 'alberto@vera.com', NULL, 'Alberto', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '666555111', 'ALUMNO', 'Vera', NULL, NULL, NULL),
	(21, b'1', 'juaquin@tutor.com', NULL, 'Juaquin', '$2a$15$DhQUBiufK9Vuh3FyoQULvODbu5NbTRDbI5LXT.zq2mwvMiRGMDUbi', '555888777', 'TUTOR', 'Lopez', NULL, NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
