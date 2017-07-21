-- phpMyAdmin SQL Dump
-- version 4.0.10.7
-- http://www.phpmyadmin.net
--
-- Računalo: localhost
-- Vrijeme generiranja: Sij 22, 2017 u 08:32 PM
-- Verzija poslužitelja: 5.5.42-cll
-- PHP verzija: 5.4.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza podataka: `novusvia_fitness`
--

DELIMITER $$
--
-- Funkcije
--
CREATE  FUNCTION Datum(dan int, mjesec int, godina int) RETURNS date
    DETERMINISTIC
BEGIN
    DECLARE datum DATE;
    SET datum = DATE_ADD(DATE_ADD(MAKEDATE(godina, 1), INTERVAL (mjesec)-1 MONTH), INTERVAL (dan)-1 DAY);
 
 RETURN (datum);
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `centar`
--

CREATE TABLE IF NOT EXISTS `centar` (
  `sifCentar` int(11) NOT NULL,
  `nazivCentar` varchar(50) NOT NULL,
  `adresaCentar` varchar(50) DEFAULT NULL,
  `nazivMjestoCentar` varchar(50) DEFAULT NULL,
  `brTelCentar` varchar(14) DEFAULT NULL,
  `napomena` text,
  PRIMARY KEY (`sifCentar`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Izbacivanje podataka za tablicu `centar`
--

INSERT INTO `centar` (`sifCentar`, `nazivCentar`, `adresaCentar`, `nazivMjestoCentar`, `brTelCentar`, `napomena`) VALUES
(1, 'Oranice', 'Oranice 48', 'Zagreb', '091 587 1322', 'kao kontakt broj sam stavio martinin mobitel : 091 587 1322');

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `clan`
--

CREATE TABLE IF NOT EXISTS `clan` (
  `sifClan` int(11) NOT NULL AUTO_INCREMENT,
  `imeClan` varchar(50) DEFAULT NULL,
  `prezimeClan` varchar(50) DEFAULT NULL,
  `datRodClan` date DEFAULT NULL,
  `adresaClan` varchar(50) DEFAULT NULL,
  `nazivMjestoClan` varchar(50) DEFAULT 'Zagreb',
  `brTelClan` varchar(14) DEFAULT NULL,
  `emailClan` varchar(50) DEFAULT NULL,
  `zanimanjeClan` varchar(50) DEFAULT NULL,
  `datClanOd` date DEFAULT NULL,
  `sifReferenca` smallint(6) NOT NULL DEFAULT '6',
  `zdravstveniProblem` text,
  `napomena` text,
  `tokenSjednica` varchar(250) NOT NULL,
  PRIMARY KEY (`sifClan`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2223 ;

--
-- Izbacivanje podataka za tablicu `clan`
--


--
-- Tablična struktura za tablicu `nacin_placanja`
--

CREATE TABLE IF NOT EXISTS `nacin_placanja` (
  `sifPlacanja` smallint(6) NOT NULL AUTO_INCREMENT,
  `nazivPlacanja` varchar(11) NOT NULL,
  PRIMARY KEY (`sifPlacanja`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Izbacivanje podataka za tablicu `nacin_placanja`
--

INSERT INTO `nacin_placanja` (`sifPlacanja`, `nazivPlacanja`) VALUES
(1, 'gotovina'),
(2, 'netbanking');

-- --------------------------------------------------------

--
-- Unutarnja struktura za pregledavanje `najkasnijiIstek`
--
CREATE TABLE IF NOT EXISTS `najkasnijiIstek` (
`sifClan` int(11)
,`sifGrupa` varchar(50)
,`datUplataDo` date
);
-- --------------------------------------------------------

--
-- Unutarnja struktura za pregledavanje `najkasnijiIstekClan`
--
CREATE TABLE IF NOT EXISTS `najkasnijiIstekClan` (
`sifClan` int(11)
,`datUplataDo` date
);
-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `pravo`
--

CREATE TABLE IF NOT EXISTS `pravo` (
  `pravoID` smallint(6) NOT NULL,
  `nazivPravo` varchar(50) NOT NULL,
  PRIMARY KEY (`pravoID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Izbacivanje podataka za tablicu `pravo`
--

INSERT INTO `pravo` (`pravoID`, `nazivPravo`) VALUES
(1, 'Instruktor'),
(2, 'Moderator'),
(3, 'Super Administrator');

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `program`
--

CREATE TABLE IF NOT EXISTS `program` (
  `sifProgram` varchar(6) NOT NULL,
  `nazivProgram` varchar(50) DEFAULT NULL,
  `trajanjeMin` int(11) DEFAULT NULL,
  `pon` tinyint(1) DEFAULT NULL,
  `uto` tinyint(1) DEFAULT NULL,
  `sri` tinyint(1) DEFAULT NULL,
  `cet` tinyint(1) DEFAULT NULL,
  `pet` tinyint(1) DEFAULT NULL,
  `sub` tinyint(1) DEFAULT NULL,
  `ned` tinyint(1) DEFAULT NULL,
  `napomena` text,
  PRIMARY KEY (`sifProgram`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Izbacivanje podataka za tablicu `program`
--

INSERT INTO `program` (`sifProgram`, `nazivProgram`, `trajanjeMin`, `pon`, `uto`, `sri`, `cet`, `pet`, `sub`, `ned`, `napomena`) VALUES
('ZUMBA', 'Zumba Fitness', 60, 1, 1, 1, 1, 1, 0, 0, ''),
('JAZZ', 'Great Booty', 60, 0, 1, 0, 1, 0, 0, 0, ''),
('BW', 'Body Workout', 60, 0, 1, 0, 1, 0, 1, 0, NULL),
('BB', 'Pilates', 45, 1, 0, 1, 0, 1, 0, 0, ''),
('KOMB', 'Kombinacija ZU/BW/HH', 60, 1, 1, 1, 1, 1, 0, 0, ''),
('AMT', 'AM trudnice', 60, 0, 1, 0, 1, 0, 0, 0, ''),
('HH', 'High heel', 60, 0, 1, 0, 1, 0, 0, 0, ''),
('AM', 'AM method', 60, 0, 0, 0, 0, 0, 0, 0, ''),
('ASF', 'Ana''s Sensual Fitness', 120, 1, 1, 1, 1, 1, 1, 1, ''),
('MAME', 'Mame i bebe', 60, 0, 0, 0, 0, 0, 0, 0, ''),
('SEM', 'Seminar za trudnice', 90, 0, 0, 0, 0, 0, 0, 0, 'varijabilno trajanje'),
('YOGA', 'Yoga', 60, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('OSTALO', 'Neraspoređene osobe', 120, 0, 0, 0, 0, 0, 0, 1, ''),
('AW', 'ASF workout', 60, 1, 1, 1, 1, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `referenca`
--

CREATE TABLE IF NOT EXISTS `referenca` (
  `sifRef` smallint(6) NOT NULL AUTO_INCREMENT,
  `nazivRef` varchar(50) NOT NULL,
  PRIMARY KEY (`sifRef`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Izbacivanje podataka za tablicu `referenca`
--

INSERT INTO `referenca` (`sifRef`, `nazivRef`) VALUES
(1, 'web stranica'),
(2, 'facebook'),
(3, 'letak'),
(4, 'reklama vizual'),
(5, 'preporuka'),
(6, 'ostalo');

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `sjednica`
--

CREATE TABLE IF NOT EXISTS `sjednica` (
  `sjednicaID` int(11) NOT NULL AUTO_INCREMENT,
  `tokenSjed` varchar(250) NOT NULL,
  `sifZaposlenik` int(11) NOT NULL,
  `IPAdresaSjed` varchar(16) NOT NULL,
  `pocetakSjed` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `krajSjed` timestamp NULL DEFAULT NULL,
  `aktivnaSjed` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`sjednicaID`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=125 ;

--
-- Tablična struktura za tablicu `trening`
--

CREATE TABLE IF NOT EXISTS `trening` (
  `sifTrening` int(11) NOT NULL AUTO_INCREMENT,
  `sifGrupa` int(11) DEFAULT NULL,
  `sifZap` int(11) DEFAULT NULL,
  `sifClan` int(11) DEFAULT NULL,
  `sifVP` int(11) DEFAULT NULL,
  PRIMARY KEY (`sifTrening`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `uplata`
--

CREATE TABLE IF NOT EXISTS `uplata` (
  `sifUplata` int(11) NOT NULL AUTO_INCREMENT,
  `sifClan` int(11) DEFAULT NULL,
  `datUplata` date DEFAULT NULL,
  `datUplataDo` date DEFAULT NULL,
  `sifPlacanja` smallint(6) DEFAULT '1',
  `sifVP` int(11) DEFAULT NULL,
  `sifGrupa` varchar(50) DEFAULT NULL,
  `iznosUplata` int(11) NOT NULL,
  `tokenSjednica` varchar(250) NOT NULL,
  PRIMARY KEY (`sifUplata`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=6176 ;


--
-- Tablična struktura za tablicu `vp`
--

CREATE TABLE IF NOT EXISTS `vp` (
  `sifVP` int(11) NOT NULL AUTO_INCREMENT,
  `sifProgram` varchar(6) DEFAULT NULL,
  `brDolazaka` smallint(6) DEFAULT NULL,
  `cijena` int(11) DEFAULT NULL,
  PRIMARY KEY (`sifVP`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=19 ;

--
-- Izbacivanje podataka za tablicu `vp`
--

INSERT INTO `vp` (`sifVP`, `sifProgram`, `brDolazaka`, `cijena`) VALUES
(1, 'ASF', 1, 660),
(2, 'ZUMBA', 1, 150),
(3, 'ZUMBA', 2, 280),
(4, 'ZUMBA', 3, 300),
(5, 'JAZZ', 2, 280),
(6, 'BW', 2, 280),
(7, 'BW', 3, 300),
(8, 'BB', 2, 50),
(9, 'AM', 2, 350),
(10, 'AMT', 2, 250),
(11, 'HH', 2, 280),
(12, 'HH', 3, 300),
(13, 'KOMB', 5, 330),
(14, 'MAME', 2, 250),
(15, 'SEM', 6, 600),
(16, 'YOGA', 1, 180),
(17, 'OSTALO', 0, 0),
(18, 'AW', 2, 300);

-- --------------------------------------------------------

--
-- Tablična struktura za tablicu `zaposlenik`
--

CREATE TABLE IF NOT EXISTS `zaposlenik` (
  `sifZap` int(11) NOT NULL AUTO_INCREMENT,
  `imeZap` varchar(50) DEFAULT NULL,
  `prezimeZap` varchar(50) DEFAULT NULL,
  `datRodZap` date DEFAULT NULL,
  `adresaZap` varchar(50) DEFAULT NULL,
  `nazivMjestoZap` varchar(50) DEFAULT NULL,
  `brTelZap` varchar(14) DEFAULT NULL,
  `emailZap` varchar(50) DEFAULT NULL,
  `userName` varchar(15) DEFAULT NULL,
  `lozinka` varchar(250) DEFAULT NULL,
  `pravoID` smallint(6) NOT NULL,
  `napomena` text,
  PRIMARY KEY (`sifZap`)
) ENGINE=MyISAM  DEFAULT CHARSET=utf8 AUTO_INCREMENT=1795 ;


--
-- Tablična struktura za tablicu `zaposlenik_grupa`
--

CREATE TABLE IF NOT EXISTS `zaposlenik_grupa` (
  `sifZap` int(11) NOT NULL,
  `sifGrupa` varchar(50) NOT NULL,
  PRIMARY KEY (`sifZap`,`sifGrupa`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;


--
-- Struktura za pregledavanje `najkasnijiIstek`
--
DROP TABLE IF EXISTS `najkasnijiIstek`;

CREATE VIEW najkasnijiIstek AS (select uplata.sifClan AS sifClan,uplata.sifGrupa AS sifGrupa,max(uplata.datUplataDo) AS datUplataDo from uplata group by uplata.sifClan,uplata.sifGrupa);

-- --------------------------------------------------------

--
-- Struktura za pregledavanje `najkasnijiIstekClan`
--
DROP TABLE IF EXISTS `najkasnijiIstekClan`;

CREATE VIEW najkasnijiIstekClan AS (select uplata.sifClan AS sifClan,max(uplata.datUplataDo) AS datUplataDo from uplata group by uplata.sifClan);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
