/*
SQLyog 企业版 - MySQL GUI v8.14 
MySQL - 5.5.31-0ubuntu0.13.04.1 : Database - yurun
*********************************************************************
*/


/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `Drug` */

DROP TABLE IF EXISTS `drug`;

CREATE TABLE `drug` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `NAME` char(50) DEFAULT NULL,
  `drug_desc` varchar(255) DEFAULT NULL,
  `company_name` char(50) DEFAULT NULL,
  `contact_name` char(10) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `batch` */

DROP TABLE IF EXISTS `batch`;

CREATE TABLE `batch` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `pig_count` int(11) DEFAULT NULL,
  `transporter_rfid` char(16) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `cure_use` */

DROP TABLE IF EXISTS `cure_use`;

CREATE TABLE `cure_use` (
  `id` int(11) NOT NULL DEFAULT '0',
  `pig_rfid` char(16) DEFAULT NULL,
  `drug_rfid` char(16) DEFAULT NULL,
  `farm_id` int(11) DEFAULT NULL,
  `cure_desc` varchar(255) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `factory` */

DROP TABLE IF EXISTS `factory`;

CREATE TABLE `factory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `NAME` char(20) DEFAULT NULL,
  `TYPE` char(20) DEFAULT NULL,
  `tele` char(12) DEFAULT NULL,
  `factory_desc` varchar(500) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `feed` */

DROP TABLE IF EXISTS `feed`;

CREATE TABLE `feed` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `NAME` char(50) DEFAULT NULL,
  `feed_desc` varchar(255) DEFAULT NULL,
  `contact_name` char(10) DEFAULT NULL,
  `company_name` char(10) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `feed_use` */

DROP TABLE IF EXISTS `feed_use`;

CREATE TABLE `feed_use` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `feed_rfid` char(16) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `feeduse_desc` varchar(255) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `meat_transmit` */

DROP TABLE IF EXISTS `meat_transmit`;

CREATE TABLE `meat_transmit` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `meat_barcode` char(32) NOT NULL,
  `transporter_rfid` char(16) DEFAULT NULL,
  `leave_checker_rfid` char(16) DEFAULT NULL,
  `arrive_checker_rfid` char(16) DEFAULT NULL,
  `from_factory_id` int(11) DEFAULT NULL,
  `to_factory_id` int(11) DEFAULT NULL,
  `leave_time` datetime DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `pig` */

DROP TABLE IF EXISTS `pig`;

CREATE TABLE `pig` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `birth_place` varchar(50) DEFAULT NULL,
  `breed` char(10) DEFAULT NULL,
  `in_weight` float DEFAULT NULL,
  `out_weight` float DEFAULT NULL,
  `in_checker_rfid` char(16) DEFAULT NULL,
  `out_checker_rfid` char(16) DEFAULT NULL,
  `in_time` datetime DEFAULT NULL,
  `out_time` datetime DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `pig_transmit` */

DROP TABLE IF EXISTS `pig_transmit`;

CREATE TABLE `pig_transmit` (
  `id` bigint(20) DEFAULT NULL,
  `transmit_rfid` char(16) DEFAULT NULL,
  `pig_rfid` char(16) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT NULL,
  `leave_time` datetime DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `prevent_use` */

DROP TABLE IF EXISTS `prevent_use`;

CREATE TABLE `prevent_use` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `drug_rfid` char(16) DEFAULT NULL,
  `farm_id` int(11) DEFAULT NULL,
  `prevent_desc` varchar(255) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `sale_meat` */

DROP TABLE IF EXISTS `sale_meat`;

CREATE TABLE `sale_meat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `sale_barcode` char(32) NOT NULL,
  `meat_barcode` char(32) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `seller_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`sale_barcode`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `slaughter_batch` */

DROP TABLE IF EXISTS `slaughter_batch`;

CREATE TABLE `slaughter_batch` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `batch_rfid` char(16) DEFAULT NULL,
  `pig_rfid` char(16) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `slaughter_meat` */

DROP TABLE IF EXISTS `slaughter_meat`;

CREATE TABLE `slaughter_meat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `meat_barcode` char(32) NOT NULL,
  `batch_rfid` char(16) DEFAULT NULL,
  `TYPE` char(10) DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `factory_id` int(11) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`meat_barcode`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `transmit` */

DROP TABLE IF EXISTS `transmit`;

CREATE TABLE `transmit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `transporter_rfid` char(16) DEFAULT NULL,
  `pig_count` int(11) DEFAULT NULL,
  `checker_rfid` char(16) DEFAULT NULL,
  `from_factory_id` int(11) DEFAULT NULL,
  `to_factory_id` int(11) DEFAULT NULL,
  `leave_time` datetime DEFAULT NULL,
  `arrive_time` datetime DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Table structure for table `worker` */

DROP TABLE IF EXISTS `worker`;

CREATE TABLE `worker` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rfid` char(16) NOT NULL,
  `real_name` varchar(50) DEFAULT NULL,
  `login_name` varchar(50) DEFAULT NULL,
  `pass` char(32) DEFAULT NULL,
  `pos` char(20) DEFAULT NULL,
  `factory_id` char(16) DEFAULT NULL,
  `tele` char(12) DEFAULT NULL,
  `email` char(50) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `upd_time` datetime DEFAULT NULL,
  PRIMARY KEY (`rfid`),
  UNIQUE KEY `Id` (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
