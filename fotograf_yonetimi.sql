-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1
-- Üretim Zamanı: 29 Ağu 2024, 13:54:50
-- Sunucu sürümü: 10.4.32-MariaDB
-- PHP Sürümü: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `fotograf_yonetimi`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `fotograf_yuklemeleri`
--

CREATE TABLE `fotograf_yuklemeleri` (
  `id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `yuklenme_tarihi` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Tablo döküm verisi `fotograf_yuklemeleri`
--

INSERT INTO `fotograf_yuklemeleri` (`id`, `url`, `yuklenme_tarihi`) VALUES
(94, 'uploads/66cf3e9b40317.png', '2024-08-28 15:13:31'),
(95, 'uploads/66cf3ea0beeb1.png', '2024-08-28 15:13:36'),
(96, 'uploads/66d06011e47b4.png', '2024-08-29 11:48:33'),
(97, 'uploads/66d0602c03fda.png', '2024-08-29 11:49:00');

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `fotograf_yuklemeleri`
--
ALTER TABLE `fotograf_yuklemeleri`
  ADD PRIMARY KEY (`id`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `fotograf_yuklemeleri`
--
ALTER TABLE `fotograf_yuklemeleri`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
