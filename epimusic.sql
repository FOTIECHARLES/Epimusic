-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mer. 14 mai 2025 à 11:34
-- Version du serveur : 10.11.11-MariaDB-0ubuntu0.24.04.2
-- Version de PHP : 8.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `epimusic.sql`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `telephone` varchar(20) NOT NULL,
  `address` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `postal_code` varchar(10) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL,
  `is_primary` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `user_id`, `name`, `telephone`, `address`, `complement`, `postal_code`, `city`, `country`, `is_primary`) VALUES
(1, 3, 'Pierre Richard', '1234567890', '123 Rue de Test', 'Appt 32', '75000', 'Paris', 'France', 1),
(2, 3, 'Jean-Michel de l\'entrepôt', '1234567891', '123 Rue de l\'entrepôt', '', '59000', 'Lille', 'France', 0),
(3, 2, 'Test TEST', '1234567890', '123 Rue de Test', '', '75000', 'Paris', 'France', 1);

-- --------------------------------------------------------

--
-- Structure de la table `admin_order`
--

CREATE TABLE `admin_order` (
  `id` int(11) NOT NULL,
  `order_number` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delivery_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_order`
--

INSERT INTO `admin_order` (`id`, `order_number`, `status`, `created_at`, `update_at`, `delivery_date`) VALUES
(1, 'HNO44UU5U962W', 'Nouvelle commande', '2024-08-31 19:58:58', '2024-08-31 19:58:58', NULL),
(2, 'R3JFIFL4PCHN8', 'Nouvelle commande', '2024-08-31 20:03:29', '2024-08-31 20:03:29', NULL),
(3, 'BRX9W9B33700N', 'Nouvelle commande', '2024-08-31 20:06:36', '2024-08-31 20:06:36', NULL),
(4, 'JBVVES22D609C', 'Nouvelle commande', '2024-08-31 20:09:01', '2024-08-31 20:09:01', NULL),
(5, 'DG5LUS2XXC1AZ', 'Nouvelle commande', '2024-08-31 20:18:18', '2024-08-31 20:18:18', NULL),
(6, 'I00H1UHQAWK4U', 'Nouvelle commande', '2024-08-31 20:18:48', '2024-08-31 20:18:48', NULL),
(7, 'PGLT97APR26YX', 'Nouvelle commande', '2024-08-31 20:18:59', '2024-08-31 20:18:59', NULL),
(8, '1AYJ3UEEBHKMP', 'Nouvelle commande', '2024-08-31 20:19:16', '2024-08-31 20:19:16', NULL),
(10, 'LW23N0QT02VZV', 'Nouvelle commande', '2024-08-31 20:19:33', '2024-08-31 20:19:33', NULL),
(13, 'LGHP7BR83JIZD', 'Nouvelle commande', '2024-08-31 20:25:05', '2024-08-31 20:25:05', NULL),
(14, 'O7AREKIBRME8U', 'Nouvelle commande', '2024-08-31 20:25:37', '2024-08-31 20:25:37', NULL),
(15, 'UL2HQJRC3OGRT', 'Nouvelle commande', '2024-08-31 20:50:08', '2024-08-31 20:50:08', NULL),
(16, 'TJBPD1A7WJS12', 'Nouvelle commande', '2024-08-31 20:51:49', '2024-08-31 20:51:49', NULL),
(17, 'I72WAC0A5N57W', 'Nouvelle commande', '2024-08-31 20:54:53', '2024-08-31 20:54:53', NULL),
(18, 'BN1NMQWXJMPFX', 'Nouvelle commande', '2024-08-31 20:56:36', '2024-08-31 20:56:36', NULL),
(31, '7DG1Q0M6RG2IS', 'Nouvelle commande', '2024-08-31 21:18:39', '2024-08-31 21:18:39', NULL),
(33, '1XX4TM14HX65T', 'Nouvelle commande', '2024-08-31 21:19:47', '2024-08-31 21:19:47', NULL),
(34, 'DAL207Q0P4DRN', 'Nouvelle commande', '2024-08-31 21:19:51', '2024-08-31 21:19:51', NULL),
(43, 'JB4JYNEBAWA42', 'Nouvelle commande', '2024-08-31 21:22:43', '2024-08-31 21:22:43', NULL),
(48, 'TSO428RKFR4KR', 'Nouvelle commande', '2024-08-31 21:23:11', '2024-08-31 21:23:11', NULL),
(51, '3SAL6FO5N9NS5', 'Nouvelle commande', '2024-08-31 21:25:10', '2024-08-31 21:25:10', NULL),
(52, '9RNVQK2SHI92V', 'Nouvelle commande', '2024-08-31 21:26:16', '2024-08-31 21:26:16', NULL),
(53, 'BWO5R8C2KQQXK', 'livré', '2024-09-02 08:21:37', '2024-09-02 08:21:37', NULL),
(54, 'YAT4MN17VHNY6', 'livré', '2025-03-13 14:26:18', '2025-03-13 14:26:18', NULL),
(55, 'OCQQI5BKEYGES', 'livré', '2025-03-13 14:26:20', '2025-03-13 14:26:20', NULL),
(56, 'QZ9SYX6JWOPQB', 'livré', '2025-03-13 14:26:25', '2025-03-13 14:26:25', NULL),
(57, 'G7OI52TAMTWRA', 'livré', '2025-03-13 14:26:34', '2025-03-13 14:26:34', NULL),
(58, 'LURVXL58VE68R', 'livré', '2025-03-13 14:29:10', '2025-03-13 14:29:10', NULL),
(59, '4RXDOSTG0C7XS', 'livré', '2025-03-13 14:55:32', '2025-03-13 14:55:32', NULL),
(60, '4CDM331J9KML8', 'livré', '2025-03-13 14:55:34', '2025-03-13 14:55:34', NULL),
(61, 'LUS7BBYHSD5HN', 'livré', '2025-03-13 14:58:59', '2025-03-13 14:58:59', NULL),
(62, 'RZV4LGVGUGLDB', 'livré', '2025-03-13 15:03:47', '2025-03-13 15:03:47', NULL),
(63, 'FVGXLISU4AWQ0', 'livré', '2025-05-14 09:34:55', '2025-05-14 09:34:55', NULL),
(64, 'Z6YVCTM9E799X', 'livré', '2025-05-14 09:37:00', '2025-05-14 09:37:00', NULL),
(72, '2D1YG9DUVNBB7', 'livré', '2025-05-14 10:15:34', '2025-05-14 10:15:34', NULL),
(80, 'QLVA8QN91MBSP', 'livré', '2025-05-14 11:13:36', '2025-05-14 11:13:36', NULL),
(81, '6NAWBFXXIU4VW', 'livré', '2025-05-14 11:14:15', '2025-05-14 11:14:15', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `admin_order_item`
--

CREATE TABLE `admin_order_item` (
  `id` int(11) NOT NULL,
  `model_id` int(11) DEFAULT NULL,
  `admin_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `model_color` varchar(255) DEFAULT NULL,
  `model_size` varchar(255) DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_order_item`
--

INSERT INTO `admin_order_item` (`id`, `model_id`, `admin_order_id`, `product_id`, `model_color`, `model_size`, `is_main`, `quantity`) VALUES
(9, 10, 14, 10, NULL, NULL, 1, 11),
(36, 2, 48, 2, NULL, NULL, 1, 9),
(39, 3, 51, 3, 'Marron', NULL, 1, 12),
(40, 1, 52, 1, 'Jaune', NULL, 1, 11),
(41, 17, 53, 17, 'Noir', NULL, 1, 17),
(42, 18, 64, 18, NULL, '45', 1, 5),
(50, 19, 72, 19, NULL, '33', 1, 5),
(58, 19, 80, 19, NULL, '33', 1, 10),
(59, 18, 81, 18, NULL, '45', 1, 15);

-- --------------------------------------------------------

--
-- Structure de la table `anonymous_cart`
--

CREATE TABLE `anonymous_cart` (
  `id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `anonymous_cart`
--

INSERT INTO `anonymous_cart` (`id`, `token`, `created_at`, `updated_at`, `total`) VALUES
(1, '5d842fc7de88b28282bf370956dff260', '2024-08-20 10:05:44', NULL, 1333.68),
(2, '07bcaf014abd15b55f0222c3770bf0ca', '2024-08-26 13:46:30', NULL, 37.99),
(3, 'bf0419d9c774f5a3ebe256a028f2c20c', '2024-09-02 08:07:47', NULL, 37.99);

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `brand`
--

INSERT INTO `brand` (`id`, `product_id`, `name`) VALUES
(3, 3, 'Gibson'),
(8, 8, 'Yamaha'),
(21, 9, ''),
(22, 1, ''),
(23, 2, '');

-- --------------------------------------------------------

--
-- Structure de la table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `total` double NOT NULL,
  `promo_total` double NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`, `updated_at`, `total`, `promo_total`) VALUES
(19, 2, '2024-09-01 18:45:49', '2024-09-02 11:09:36', 15, 0),
(22, 4, '2025-03-28 19:58:45', '2025-03-28 21:00:07', 179.8, 0),
(28, 5, '2025-05-14 11:19:42', '2025-05-14 11:19:42', 220, 0);

-- --------------------------------------------------------

--
-- Structure de la table `cart_item`
--

CREATE TABLE `cart_item` (
  `id` int(11) NOT NULL,
  `cart_id` int(11) DEFAULT NULL,
  `anonymous_cart_id` int(11) DEFAULT NULL,
  `product_id` int(11) NOT NULL,
  `model_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` double NOT NULL,
  `promo_price` double DEFAULT NULL,
  `gift_wrap` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cart_item`
--

INSERT INTO `cart_item` (`id`, `cart_id`, `anonymous_cart_id`, `product_id`, `model_id`, `quantity`, `price`, `promo_price`, `gift_wrap`) VALUES
(1, NULL, NULL, 14, 14, 1, 10, NULL, 0),
(2, NULL, NULL, 3, 3, 1, 469.99, NULL, 0),
(3, NULL, NULL, 2, 2, 1, 349.99, NULL, 0),
(8, NULL, 1, 17, 17, 3, 9.9, NULL, 0),
(9, NULL, 1, 6, 6, 1, 469, NULL, 0),
(10, NULL, 1, 2, 2, 1, 349.99, NULL, 0),
(11, NULL, 1, 3, 3, 1, 469.99, NULL, 0),
(12, NULL, 1, 10, 10, 1, 15, NULL, 0),
(13, NULL, NULL, 1, 1, 2, 6, NULL, 0),
(34, NULL, 2, 18, 18, 1, 37.99, NULL, 0),
(39, NULL, 3, 18, 18, 1, 37.99, NULL, 0),
(40, 19, NULL, 10, 10, 1, 15, NULL, 0),
(51, 22, NULL, 1, 1, 2, 89.9, NULL, 0),
(57, 28, NULL, 11, 11, 10, 22, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `weight_unit` varchar(255) DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `weight_unit`, `image_path`) VALUES
(1, 'Instrument', NULL, '/uploads/category_1.webp'),
(2, 'Vinyle', NULL, '/uploads/category_2.webp'),
(3, 'Goodies', NULL, '/uploads/category_3.webp');

-- --------------------------------------------------------

--
-- Structure de la table `category_size`
--

CREATE TABLE `category_size` (
  `category_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category_size`
--

INSERT INTO `category_size` (`category_id`, `size_id`) VALUES
(2, 1),
(2, 2),
(3, 3),
(3, 4),
(3, 5),
(3, 6),
(3, 7),
(3, 8);

-- --------------------------------------------------------

--
-- Structure de la table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `color`
--

INSERT INTO `color` (`id`, `name`) VALUES
(1, 'Noir'),
(2, 'Blanc'),
(3, 'Rouge'),
(4, 'Marron'),
(5, 'Gris'),
(6, 'Orange'),
(7, 'Bleu'),
(8, 'Vert'),
(9, 'Jaune'),
(10, 'Rose'),
(11, 'Violet');

-- --------------------------------------------------------

--
-- Structure de la table `dimension`
--

CREATE TABLE `dimension` (
  `id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL,
  `width` double NOT NULL,
  `height` double NOT NULL,
  `length` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `dimension`
--

INSERT INTO `dimension` (`id`, `size_id`, `width`, `height`, `length`) VALUES
(1, 1, 17.5, 17.5, 0.5),
(2, 2, 30, 30, 0.5),
(3, 3, 160, 110, 110),
(4, 8, 10, 10, 15),
(5, 5, 80, 50, 50),
(6, 4, 130, 80, 80),
(7, 7, 30, 30, 30),
(8, 6, 80, 60, 60);

-- --------------------------------------------------------

--
-- Structure de la table `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Déchargement des données de la table `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240802214106', '2024-08-02 21:41:51', 219),
('DoctrineMigrations\\Version20240807084643', '2024-08-07 09:01:56', 2012),
('DoctrineMigrations\\Version20240811121228', '2024-08-11 12:12:30', 170),
('DoctrineMigrations\\Version20240811154843', '2024-08-11 15:48:48', 184),
('DoctrineMigrations\\Version20240811202920', '2024-08-11 20:29:27', 70),
('DoctrineMigrations\\Version20240811213157', '2024-08-11 21:32:01', 324),
('DoctrineMigrations\\Version20240819094146', '2024-08-19 09:41:57', 287),
('DoctrineMigrations\\Version20240821114741', '2024-08-21 11:47:47', 34),
('DoctrineMigrations\\Version20240821123934', '2024-08-21 12:39:37', 44),
('DoctrineMigrations\\Version20240822094641', '2024-08-22 09:46:50', 124),
('DoctrineMigrations\\Version20240827134101', '2024-08-27 13:41:12', 118),
('DoctrineMigrations\\Version20240829092429', '2024-08-29 09:24:35', 45),
('DoctrineMigrations\\Version20240831192055', '2024-08-31 19:21:10', 117),
('DoctrineMigrations\\Version20240831195831', '2024-08-31 19:58:35', 234),
('DoctrineMigrations\\Version20240901131738', '2024-09-01 13:17:46', 110);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `id` int(11) NOT NULL,
  `path` varchar(255) NOT NULL,
  `is_main` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `path`, `is_main`) VALUES
(1, '/uploads/1_0.webp', 1),
(2, '/uploads/1_1.webp', 0),
(3, '/uploads/1_2.webp', 0),
(4, '/uploads/2_0.webp', 1),
(5, '/uploads/2_1.webp', 0),
(6, '/uploads/2_2.webp', 0),
(7, '/uploads/2_3.webp', 0),
(8, '/uploads/3_0.webp', 1),
(9, '/uploads/3_1.webp', 0),
(10, '/uploads/3_2.webp', 0),
(11, '/uploads/4_0.webp', 1),
(12, '/uploads/4_1.webp', 0),
(13, '/uploads/4_2.webp', 0),
(14, '/uploads/4_3.webp', 0),
(15, '/uploads/5_0.webp', 1),
(16, '/uploads/5_1.webp', 0),
(17, '/uploads/6_0.webp', 1),
(18, '/uploads/6_1.webp', 0),
(19, '/uploads/7_0.webp', 1),
(20, '/uploads/8_0.webp', 1),
(21, '/uploads/8_1.webp', 0),
(22, '/uploads/9_0.webp', 1),
(23, '/uploads/10_0.webp', 1),
(24, '/uploads/11_0.webp', 1),
(25, '/uploads/11_1.webp', 0),
(26, '/uploads/12_0.webp', 1),
(27, '/uploads/13_0.webp', 1),
(28, '/uploads/14_0.webp', 1),
(29, '/uploads/15_0.webp', 1),
(30, '/uploads/16_0.webp', 1),
(31, '/uploads/16_1.webp', 0),
(32, '/uploads/17_0.webp', 1),
(33, '/uploads/17_1.webp', 0),
(34, '/uploads/18_0.webp', 1),
(35, '/uploads/18_1.webp', 0),
(36, '/uploads/19_0.webp', 1),
(37, '/uploads/20_0.webp', 1),
(38, '/uploads/20_1.webp', 0),
(39, '/uploads/21_0.webp', 1),
(40, '/uploads/21_1.webp', 0),
(41, '/uploads/22_0.webp', 1),
(42, '/uploads/22_1.webp', 0),
(43, '/uploads/23_0.webp', 1),
(44, '/uploads/24_0.webp', 1),
(45, '/uploads/25_0.webp', 1);

-- --------------------------------------------------------

--
-- Structure de la table `model`
--

CREATE TABLE `model` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `price` double NOT NULL,
  `weight` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model`
--

INSERT INTO `model` (`id`, `product_id`, `color_id`, `size_id`, `price`, `weight`) VALUES
(1, 1, 9, NULL, 89.9, 1.2),
(2, 2, 9, NULL, 349.99, 1.2),
(3, 3, 4, NULL, 469.99, 0.5),
(4, 4, 2, NULL, 226, 0.84),
(5, 5, 2, NULL, 1099.01, 1.2),
(6, 6, 4, NULL, 469, 0.46),
(7, 7, 4, NULL, 436, 0.46),
(8, 8, 1, NULL, 899.99, 38),
(9, 9, 2, NULL, 1149.99, 42),
(10, 10, 1, 6, 15, 0.15),
(11, 11, 1, 5, 22, 0.15),
(13, 13, 2, NULL, 4.5, 0.01),
(14, 14, 2, NULL, 10, 0.04),
(15, 15, 1, NULL, 44.9, 0.05),
(16, 16, 1, NULL, 13.9, 0.34),
(17, 17, 1, NULL, 9.9, 0.34),
(18, 18, NULL, 2, 37.99, 0.34),
(19, 19, NULL, 1, 29.99, 0.04),
(20, 20, NULL, 2, 27.99, 0.04),
(21, 21, NULL, 2, 14.99, 0.04),
(22, 22, NULL, 2, 32.99, 0.04),
(23, 23, NULL, 1, 39.99, 0.04),
(24, 24, NULL, 2, 45.99, 0.04),
(25, 25, NULL, 1, 39.99, 0.04);

-- --------------------------------------------------------

--
-- Structure de la table `model_image`
--

CREATE TABLE `model_image` (
  `model_id` int(11) NOT NULL,
  `image_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `model_image`
--

INSERT INTO `model_image` (`model_id`, `image_id`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(3, 8),
(3, 9),
(3, 10),
(4, 11),
(4, 12),
(4, 13),
(4, 14),
(5, 15),
(5, 16),
(6, 17),
(6, 18),
(7, 19),
(8, 20),
(8, 21),
(9, 22),
(10, 23),
(11, 24),
(11, 25),
(13, 27),
(14, 28),
(15, 29),
(16, 30),
(16, 31),
(17, 32),
(17, 33),
(18, 34),
(18, 35),
(19, 36),
(20, 37),
(20, 38),
(21, 39),
(21, 40),
(22, 41),
(22, 42),
(23, 43),
(24, 44),
(25, 45);

-- --------------------------------------------------------

--
-- Structure de la table `musicoin`
--

CREATE TABLE `musicoin` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `last_game_date` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `music_track`
--

CREATE TABLE `music_track` (
  `id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `music_track`
--

INSERT INTO `music_track` (`id`, `file_path`) VALUES
(1, '/music/tecktonik.mp3'),
(2, '/music/sax_guy.mp3'),
(3, '/music/ALTEGO_Yeah! x Gasolina.mp3');

-- --------------------------------------------------------

--
-- Structure de la table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `total_price` double NOT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `payment_status` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime NOT NULL,
  `shipping_cost` double DEFAULT NULL,
  `total_with_promo` double DEFAULT NULL,
  `total_with_shipping_cost` double DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order`
--

INSERT INTO `order` (`id`, `total_price`, `payment_method`, `payment_status`, `status`, `created_at`, `updated_at`, `shipping_cost`, `total_with_promo`, `total_with_shipping_cost`, `user_id`) VALUES
(4, 79.98, 'Credit Card', 'pending', 'In preparation', '2024-09-01 15:06:20', '2024-09-01 15:07:46', 5.98, 79.98, 85.96, 2),
(6, 37.99, 'Credit Card', 'pending', 'In preparation', '2024-09-01 15:17:00', '2024-09-01 15:17:19', 2.99, 37.99, 40.98, 2),
(15, 77.98, 'Credit Card', 'Pending', 'En préparation', '2024-09-01 17:15:59', '2024-09-01 17:16:24', 5.98, 77.98, 83.96, 3),
(18, 29.99, 'Credit Card', 'Pending', 'En Livré', '2024-09-01 21:10:31', '2024-09-01 21:10:57', 2.99, 29.99, 32.98, 3),
(19, 37.99, NULL, 'Pending', 'Pending', '2024-09-02 08:06:32', '2024-09-02 08:06:32', 2.99, 37.99, 40.98, 1),
(20, 37.99, NULL, 'Pending', 'Pending', '2024-09-02 08:07:51', '2024-09-02 08:07:51', 2.99, 37.99, 40.98, NULL),
(21, 15, NULL, 'Pending', 'Pending', '2024-09-02 11:09:40', '2024-09-02 11:09:40', 5.99, 15, 20.99, 2),
(22, 454.39, NULL, 'Pending', 'Pending', '2025-03-12 09:13:54', '2025-03-12 09:13:55', 7.33, 454.39, 461.72, 1),
(23, 37.99, 'Credit Card', 'Pending', 'En préparation', '2025-03-13 08:57:17', '2025-03-13 08:58:39', 2.99, 37.99, 40.98, 4),
(24, 22, NULL, 'Pending', 'Pending', '2025-03-14 13:59:31', '2025-03-14 13:59:31', 5.99, 22, 27.99, 4),
(25, 59.99, NULL, 'Pending', 'Pending', '2025-03-21 20:02:25', '2025-03-21 20:02:25', 8.98, 59.99, 68.97, 4),
(26, 179.8, NULL, 'Pending', 'Pending', '2025-03-28 21:00:11', '2025-03-28 21:00:11', 7.18, 179.8, 186.98, 4),
(27, 349.99, NULL, 'Pending', 'Pending', '2025-05-14 09:30:37', '2025-05-14 09:30:37', 3.59, 349.99, 353.58, 5),
(28, 265.93, 'Credit Card', 'Pending', 'En préparation', '2025-05-14 09:35:25', '2025-05-14 09:36:12', 20.93, 265.93, 286.86, 5),
(29, 269.91, 'Credit Card', 'Pending', 'En préparation', '2025-05-14 10:13:52', '2025-05-14 10:14:59', 26.91, 269.91, 296.82, 5),
(30, 220, NULL, 'Pending', 'Pending', '2025-05-14 10:30:25', '2025-05-14 10:30:25', 59.9, 220, 279.9, 5),
(31, 198, NULL, 'Pending', 'Pending', '2025-05-14 11:14:57', '2025-05-14 11:14:57', 53.91, 198, 251.91, 5);

-- --------------------------------------------------------

--
-- Structure de la table `order_address`
--

CREATE TABLE `order_address` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `complement` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `country` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_address`
--

INSERT INTO `order_address` (`id`, `order_id`, `name`, `telephone`, `email`, `address`, `complement`, `postal_code`, `city`, `country`) VALUES
(2, 4, 'Test Test', '1234567890', 'test@test.com', '123 Rue de Test', '', '75000', 'Paris', 'France'),
(4, 6, 'Test Test', '1234567890', 'test@test.com', '123 Rue de Test', '', '75000', 'Paris', 'France'),
(10, 15, 'Zoé Pilia', '1234567890', 'zoe@test.com', '123 Rue de Test', 'Appt 32', '75000', 'Paris', 'France'),
(11, 18, 'Zoé Pilia', '1234567891', 'zoe@test.com', '123 Rue de l\'entrepôt', '', '59000', 'Lille', 'France'),
(12, 19, 'admin Admin', '1234567890', 'admin@test.com', '123 Rue de Test', '', '75000', 'Paris', 'France'),
(13, 20, 'Bob Leponge', '1234567890', 'bob@gmail.com', '123 Rue de Test', '', '75000', 'Paris', 'France'),
(14, 22, 'francis jean', '00 00 00 00 00', 'francis@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(15, 23, 'jules cesar', '00 00 00 00 00', 'jules@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(16, 25, 'jules cesar', '06 44 00 88 09', 'jules@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(17, 27, 'test45 test45', '00 00 00 00 00', 'test45@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(18, 28, 'test45 test45', '00 00 00 00 00', 'test45@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(19, 29, 'test45 test45', '00 00 00 00 00', 'test45@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(20, 30, 'test45 test45', '00 00 00 00 00', 'test45@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France'),
(21, 31, 'test45 test45', '00 00 00 00 00', 'test45@yahoo.fr', '214 Pont de Flandres', '419', '59800', 'Lille', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `size` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` int(11) NOT NULL,
  `total_price` double NOT NULL,
  `total_promo_price` double DEFAULT NULL,
  `gift_wrap` tinyint(1) NOT NULL,
  `unit_promo_price` double DEFAULT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_name`, `color`, `size`, `quantity`, `unit_price`, `total_price`, `total_promo_price`, `gift_wrap`, `unit_promo_price`, `product_id`) VALUES
(8, 4, 'Jazz Loves Disney 2 – A Kind Of Magic - Double vinyle couleur', NULL, NULL, 2, 39, 79.98, NULL, 0, NULL, 23),
(10, 6, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(22, 15, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(23, 15, 'Minions - The Rise Of Gru Soundtrack - Vinyle Picture', NULL, NULL, 1, 39, 39.99, NULL, 0, NULL, 25),
(25, 18, 'La Petite Sirène (35ème anniversaire) - Vinyle splatter transparent', NULL, NULL, 1, 29, 29.99, NULL, 0, NULL, 19),
(26, 19, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(27, 20, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(28, 21, 'T-SHIRT FLUTE TRAVERSIERE', 'Noir', NULL, 1, 15, 15, NULL, 0, NULL, 10),
(29, 22, 'Shiver GCS-1/2 - Guitare Classique', 'Jaune', NULL, 1, 89, 89.9, NULL, 0, NULL, 1),
(30, 22, 'Takamine - GTA GC1CENAT Guitare électro-acoustique', 'Jaune', NULL, 1, 349, 349.99, NULL, 0, NULL, 2),
(31, 22, 'Porte-Clés Tambourins Bleu', 'Blanc', NULL, 1, 4, 4.5, NULL, 0, NULL, 13),
(32, 22, 'Cor d\'Harmonie Miniature', 'Blanc', NULL, 1, 10, 10, NULL, 0, NULL, 14),
(33, 23, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(34, 24, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'Noir', NULL, 1, 22, 22, NULL, 0, NULL, 11),
(35, 25, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'Noir', NULL, 1, 22, 22, NULL, 0, NULL, 11),
(36, 25, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 1, 37, 37.99, NULL, 0, NULL, 18),
(37, 26, 'Shiver GCS-1/2 - Guitare Classique', 'Jaune', NULL, 2, 89, 179.8, NULL, 0, NULL, 1),
(38, 27, 'Takamine - GTA GC1CENAT Guitare électro-acoustique', 'Jaune', NULL, 1, 349, 349.99, NULL, 0, NULL, 2),
(39, 28, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', NULL, NULL, 7, 37, 265.93, NULL, 0, NULL, 18),
(40, 29, 'La Petite Sirène (35ème anniversaire) - Vinyle splatter transparent', NULL, NULL, 9, 29, 269.91, NULL, 0, NULL, 19),
(41, 30, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'Noir', NULL, 10, 22, 220, NULL, 1, NULL, 11),
(42, 31, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'Noir', NULL, 9, 22, 198, NULL, 1, NULL, 11);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `product`
--

INSERT INTO `product` (`id`, `category_id`, `name`, `description`) VALUES
(1, 1, 'Shiver GCS-1/2 - Guitare Classique', 'Découvrez la guitare classique GCS-1/2 Shiver, idéale pour les enfants de 6 à 8 ans qui désirent s\'initier à cet instrument de musique ou poursuivre leur apprentissage avec une guitare adaptée à leur taille (entre 1m15 et 1m35) !'),
(2, 1, 'Takamine - GTA GC1CENAT Guitare électro-acoustique', 'Cette guitare à cordes nylon reste toujours aussi présente et pertinente dans la musique actuelle. Takamine n\'est pas étrangère à ce succès puisque depuis des années, elle perpétue cet artisanat avec toujours autant de passion. Un manche très agréable, des sonorités flatteuses, des finitions impeccables, voici les promesses de cette guitare.\n\nGrâce à ses rencontres avec des artistes du monde entier, Takamine réalise depuis cinquante ans des guitares à la qualité reconnue.'),
(3, 1, 'Epiphone - Les Paul junior Tobacco Burst - Guitare électrique', 'Depuis plus de 100 ans Gibson fabrique des instruments extraordinaires. Depuis ce temps ils ont laissé leur empreinte dans le monde de la musique et les guitares Gibson sont maintenant légendaires, faisant partie des guitares les plus vendues au monde.'),
(4, 1, 'WS-FL211S Stagg', 'Flûte traversière FL211S, ut, tout maillechort argenté. Clétage décalé. En étui. - Stagg WS -FL2511S - Flûte traversière en Ut. - Tête, corps et mécanique en maillechort argenté - Plateaux pleins'),
(5, 1, 'SML Paris Flûte traversière alto', 'Cette flûte alto, grâce à ses deux têtes, courbée et droite, offre la possibilité aux plus grands comme aux plus petits flûtistes de découvrir un nouvel univers et de nouvelles sonorités.\n\n\n\nUne grande flûte, qui peut être aussi jouée par des plus jeunes\n\nSi cette flûte est appréciée des professeurs comme de leurs élèves, c\'est avant tout par l\'avantage qu\'offre le choix de la tête droite ou de la tête courbe. Les plus jeunes flûtistes seront donc à même d\'adopter une posture confortable en jouant.\n\n\n\nUn instrument contrôlé et réglé.\n\nAfin de garantir une satisfaction maximale dès l’ouverture de l’étui, les flûtes SML Paris sont contrôlées et réglées dans nos ateliers afin de pouvoir être joués dès leur réception. Si certains ajustements de confort peuvent être effectués par votre magasin habituel, il ne sera néanmoins aucunement indispensable de faire passer votre flûte entre des mains expertes avant de commencer à souffler. Un vrai plus !'),
(6, 1, 'Yamaha V5SC18 - Violon débutant - Wittner Monte - 1/8 - Bois', 'Parfaitement adaptés aux débutants, jeunes enfants ou étudiants, ce violon d’entrée de gamme acoustique est fabriqué à partir de matériaux sélectionnés pour leurs bonnes qualités musicales. Il est minutieusement assemblé dans nos ateliers en utilisant les méthodes traditionnelles que l’on retrouve pour la conception de nos meilleurs violons de la gamme des instruments à cordes. La finition se fait par l’application au pinceau d’un vernis polyuréthane uni. Comme tous nos violons d’étude, il est livré complet et prêt à jouer. Il est équipé d’un archet en bois de qualité, de colophane de la marque ‘’Pirastro’’ mondialement reconnue et de cordes ‘’Prélude’’ d’Addario, le tout soigneusement rangé dans un étui rigide léger et résistant à l’eau pour un transport en toute sécurité. Sa conception, le vaste choix de tailles et son formidable rapport qualité/prix, font du violon de la gamme V5SC Yamaha, le meilleur choix d’instruments d’étude.\n\n7 tailles\n\nLe V5SC est disponible en 7 tailles : 4/4 (35,5cm), 3/4 (33,3cm), 1/2 (32cm), 1/4 (28,4cm), 1/8 (26,7cm), 1/10 (23.2cm), 1/16 (21.6cm)\n\nFabrication \"artisanale\"\n\nChaque instrument est minutieusement monté et fini à la main, utilisant les méthodes traditionnelles que l’on retrouve dans la fabrication de nos violons haut de gamme. Leur conception, leur vaste choix de tailles et leur formidable rapport qualité/prix font, des instruments à cordes Yamaha, le meilleur choix d’instruments d’étude\n\nFinition vernis polyuréthane\n\nLa finition ayant une forte incidence sur la sonorité de l\'instrument, nos ingénieurs ont testé différentes formules et vérifié les résultats acoustiques pour trouver l’harmonie parfaite entre le bois et le vernis, et ainsi obtenir la plus belle sonorité. Son application au pinceau permet d’obtenir une très belle finition.\n\nAccord aisé\n\nPour les débutants, l’accord peut être une expérience décourageante. Aussi, pour simplifier cette étape, nos violons sont montés avec un cordier Wittner « Ultra », équipé de 4 tendeurs permettant un accord fin et rapide. Violon livré complet Nos violons sont livrés montés, dans un étui compact et léger, avec un archet et de la colophane.'),
(7, 1, 'V5SC34 VIOLON ACOUST. 3/4', 'Parfaitement adaptés aux débutants, jeunes enfants ou étudiants, ce violon Yamaha de la série V5 sont fabriqués à partir de matériaux sélectionnés pour leurs qualités musicales. Chaque instrument est minutieusement monté en atelier en utilisant les méthodes traditionnelles que l\'on retrouve pour la conception des meilleurs violons de la gamme des instruments à cordes Yamaha.\n\nLa finition se fait par l\'application à la brosse d\'un vernis. Les violons sont livrés complets et prêts à jouer. Ils sont soigneusement rangés dans un étui rigide léger et résistant à l\'eau pour un transport en toute sécurité.\n\nIls sont équipés d\'un archet en bois de qualité et de colophane de la marque ‘\'Pirastro\'\' mondialement reconnue et de cordes ‘\'Prélude\'\' d\'Addario. Leur conception, leur vaste choix de tailles et leur formidable rapport qualité/prix font des violons Yamaha V5 le meilleur choix de violon d\'étude pour les débutants.\n\nCaractéristiques :\n\n- table d\'harmonie en épicéa\n- fond, éclisses manche et tête en érable\n- touche en ébène\n- chevilles, cordier bouton et mentonnière en palissandre\n\nlivré complet avec étui rigide, archet et collophane Pirastro'),
(8, 1, 'Yamaha ARIUS YDP-145 - Piano numérique - 88 touches - Noir', 'Ses qualités expressives et sonores lui permettent de retranscrire fidèlement les sensations de jeu d\'un vrai piano. Facile à prendre en main, il libérera tout votre potentiel musical. Commencez vos journées en musique, avec une sensation de bonheur : les pianos ARIUS vous donnent envie de ne jamais vous arrêter.'),
(9, 1, 'Yamaha ARIUS YDP-165 - Piano numérique blanc mat', 'Les pianos numériques ARIUS sont des instruments finement conçus, résultant de plus d\'un siècle de technologies et d\'expertise Yamaha. Parfait pour les amateurs et les étudiants, l\'ARIUS YDP-164 est un instrument compact, peu encombrant, qui s\'intègre parfaitement à tous les intérieurs.'),
(10, 3, 'T-SHIRT FLUTE TRAVERSIERE', 'Noir 100 % Coton avec impression Noir et Blanc. Existe en taille S-M-L-XL-XXL'),
(11, 3, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'T-Shirt Manches Courtes Pour Hommes des Four Horsemen\nVisuel sur le Recto de l\'Album Sorti en 1984 Nommé \"Ride The Lightning\"\nMotif Dans le Dos Reprenant les Pistes de l\'Album\nMerchandising Officiel du Groupe Metallica'),
(13, 3, 'Porte-Clés Tambourins Bleu', 'Porte-clés de la musique\nImpression 3D très détaillée\nFabriqué en PVC écologique, très durable, sans odeur et difficilement coloriable\nParfaitement assorti à vos clés, votre étui à instruments, votre sac de concert et votre sac à dos'),
(14, 3, 'Cor d\'Harmonie Miniature', 'Réduction d\'un Cor Français\nEn Métal Aurifié\nLargeur 3 cm\nLivré dans un joli écrin\nParfait pour vos décor musicaux'),
(15, 3, 'Piano Droit Miniature', 'Réduction d\'un Piano droit\nEn bois\nDimensions 14,5x12x5,5 cm\nAvec banc de piano pour un effet plus réaliste\nParfait pour un Décor Musical, en cadeau ou pour se faire plaisir'),
(16, 3, 'Tasse Métal Émaillé AC/DC - Logo', 'Mug de Camping en Métal de la Bande à Angus Young\nDimensions de la Tasse : Diamètre = 9,5 cm / Hauteur = 8,5 cm\nNe pas Mettre au Lave-Vaisselle ni au Micro-Ondes'),
(17, 3, 'Tasse MÖTLEY CRÜE - Dr. Feelgood', 'Décoré du Serpent Enroulé sur une Dague, Visuel de Leur Cinquième Album Studio Sorti en 1989\nDimensions de la Tasse : Diamètre = 8 cm / Hauteur = 9,5 cm'),
(18, 2, 'Deadpool & Wolverine (OST) - Double vinyle limité rouge/noir et jaune/bleu', 'La bande originale de l\'un des films les plus attendus du MCU ces dernières années, Deadpool & Wolverine, est enfin disponible. Elle propose une fois de plus une variété éclectique et amusante de tubes, couvrant plusieurs décennies et genres.'),
(19, 2, 'La Petite Sirène (35ème anniversaire) - Vinyle splatter transparent', 'Partez pour une aventure musicale avec la musique de La Petite Sirène de Disney sur un vinyle transparent. Célébrez le 35e anniversaire avec les chansons classiques et la musique du film !'),
(20, 2, 'Metallica - Kill\\\'em All- Vinyle standard', 'Premier album de Metallica, \"Kill \'Em All\" constitue une apocalypse musicale.'),
(21, 2, 'Les Bronzés font du ski - Bande Originale - Maxi 45T - Vinyle blanc', 'A l’occasion du 40ème anniversaire du film mythique de Patrice Leconte, la bande originale du film \"Les Bronzés font du Ski\" ressort en vinyle blanc dans une édition limitée à 2000 exemplaires et avec une pochette inédite.'),
(22, 2, 'Queen - Bohemian Rhapsody - Double Vinyle', 'Avec ses plus de 3 millions d\'entrées en France, Bohemian Rhapsody est Le biopic de la fin d\'année 2018. Le film retrace l\'histoire du mythique groupe Queen et de son charismatique leader Freddie Mercury. Le double LP de la bande originale sort enfin.'),
(23, 2, 'Jazz Loves Disney 2 – A Kind Of Magic - Double vinyle couleur', 'En 2016, Universal Music et The Walt Disney Company France ont présenté \"Jazz Loves Disney\", suivi en 2017 de \"Jazz Loves Disney 2 - A Kind of Magic\", dans le cadre de la série We Love Disney'),
(24, 2, 'Mika - Que ta tête fleurisse toujours - Vinyle Exclusif Édition Limitée', 'Cover alternative\nUne sous pochette blanche ou imprimée 4-0\nUne pochette PVC imprimée recto verso, fermeture à rabat avec un sticker rond transparent'),
(25, 2, 'Minions - The Rise Of Gru Soundtrack - Vinyle Picture', 'Après l’énorme succès du premier volet des Minions, les studios Illuminations retraceront l’enfance de Gru dans un 2e opus cet été. Une bande originale produite par Jack Antonoff (Taylor Swift, Lana del rey) nous plonge dans un univers rétro disco.');

-- --------------------------------------------------------

--
-- Structure de la table `promotion`
--

CREATE TABLE `promotion` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `model_id` int(11) DEFAULT NULL,
  `promo_price` decimal(10,2) DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `promotion`
--

INSERT INTO `promotion` (`id`, `product_id`, `model_id`, `promo_price`, `start_date`, `end_date`, `is_active`) VALUES
(1, 1, NULL, 6.00, '2024-08-20 00:00:00', '2024-08-27 00:00:00', 1),
(2, 1, NULL, 6.00, '2024-08-20 00:00:00', '2024-08-27 00:00:00', 1),
(3, 2, NULL, 300.00, '2024-08-22 00:00:00', '2024-08-28 00:00:00', 1),
(4, 3, NULL, 400.00, '2024-08-21 00:00:00', '2024-08-28 00:00:00', 1),
(6, 5, NULL, 800.00, '2024-08-22 00:00:00', '2024-08-29 00:00:00', 1);

-- --------------------------------------------------------

--
-- Structure de la table `review`
--

CREATE TABLE `review` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `model_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(1000) NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `review`
--

INSERT INTO `review` (`id`, `product_id`, `model_id`, `user_id`, `rating`, `comment`, `created_at`, `update_at`) VALUES
(1, 11, 11, 4, NULL, 'hello jean', '2025-03-14 13:59:11', '2025-03-14 13:59:11'),
(2, 18, 18, 4, NULL, 'hello world', '2025-03-21 20:02:20', '2025-03-21 20:02:20');

-- --------------------------------------------------------

--
-- Structure de la table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `value` varchar(255) NOT NULL,
  `unit` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `size`
--

INSERT INTO `size` (`id`, `value`, `unit`) VALUES
(1, '33', 'RPM'),
(2, '45', 'RPM'),
(3, 'XXL', 'taille'),
(4, 'XL', 'taille'),
(5, 'L', 'taille'),
(6, 'M', 'taille'),
(7, 'S', 'taille'),
(8, 'XS', 'taille');

-- --------------------------------------------------------

--
-- Structure de la table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `color_id` int(11) DEFAULT NULL,
  `size_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `stock`
--

INSERT INTO `stock` (`id`, `product_id`, `color_id`, `size_id`, `quantity`) VALUES
(3, 3, 4, NULL, 12),
(4, 4, 2, NULL, 10),
(5, 5, 2, NULL, 10),
(6, 6, 4, NULL, 10),
(7, 7, 4, NULL, 10),
(8, 8, 1, NULL, 10),
(10, 10, 1, 6, 11),
(11, 11, 1, 5, 10),
(13, 13, 2, NULL, 10),
(14, 14, 2, NULL, 10),
(15, 15, 1, NULL, 10),
(16, 16, 1, NULL, 10),
(17, 17, 1, NULL, 17),
(18, 18, NULL, 2, 15),
(19, 19, NULL, 1, 10),
(20, 20, NULL, 2, 9),
(21, 21, NULL, 2, 10),
(22, 22, NULL, 2, 10),
(23, 23, NULL, 1, 8),
(24, 24, NULL, 2, 10),
(25, 25, NULL, 1, 9),
(77, 25, 2, 2, 6),
(78, 25, 2, 3, 6),
(82, 1, 9, NULL, 11),
(84, 9, 2, NULL, 10),
(92, 2, 9, NULL, 9);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transport_provider`
--

CREATE TABLE `transport_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ean` bigint(20) NOT NULL,
  `length` int(11) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `price` double NOT NULL,
  `max_weight` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `transport_provider`
--

INSERT INTO `transport_provider` (`id`, `name`, `ean`, `length`, `width`, `height`, `price`, `max_weight`) VALUES
(1, 'PrestaColis (S)', 978020137962, 50, 30, 15, 2.99, 4),
(2, 'PrestaColis (M)', 978020137963, 60, 60, 40, 3.99, 10),
(3, 'PrestaColis (L)', 978020137964, 70, 70, 100, 5.99, 25),
(4, 'MaigaLour', 821474206912, 100, 100, 150, 10.99, 70),
(5, 'MaigaLour Premium', 821474206913, 200, 200, 200, 21.99, 300);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(180) NOT NULL,
  `roles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`roles`)),
  `password` varchar(255) NOT NULL,
  `is_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `roles`, `password`, `is_verified`) VALUES
(1, 'admin', 'Admin', 'admin@test.com', '[\"ROLE_ADMIN\"]', '$2y$13$TQHZJOf.udLo4mg1CYVWBe3ewW75I0YbHXNAzRr6sRmnQ7lgE391O', 0),
(2, 'Test', 'Test', 'test@test.com', '[\"ROLE_USER\"]', '$2y$13$33gjjEmEDHoyneuwUFNd6u.Orm/1dKhlm2W7tuz7hFitbhYGPIQ8O', 0),
(3, 'Zoé', 'Pilia', 'zoe@test.com', '[\"ROLE_USER\"]', '$2y$13$XATdUbtNX40sCnrUP.MfOOzlSjrJ7taZjVx8oWH7d7AjRf1Rjf6O2', 0),
(4, 'jules', 'cesar', 'jules@yahoo.fr', '[\"ROLE_ADMIN\"]', '$2y$13$738AITuPQGlgfMAF8/anze5kEYcE0T.Az737UR07K0GcK61JP6qFO', 0),
(5, 'test45', 'test45', 'test45@yahoo.fr', '[\"ROLE_USER\"]', '$2y$13$crttws0Jo/CMtKtEBnTgKe91k1pBjAMEnUJMxT8112FzgspaxyBb.', 0);

-- --------------------------------------------------------

--
-- Structure de la table `weight`
--

CREATE TABLE `weight` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `value` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `weight`
--

INSERT INTO `weight` (`id`, `product_id`, `value`) VALUES
(1, 1, 1.2),
(2, 2, 1.2),
(3, 3, 0),
(4, 4, 0.84),
(5, 5, 1.2),
(6, 6, 0.46),
(7, 7, 0.46),
(8, 8, 38),
(9, 9, 42),
(10, 10, 0.15),
(11, 11, 0.15),
(13, 13, 0.01),
(14, 14, 0.04),
(15, 15, 0.05),
(16, 16, 0.34),
(17, 17, 0.34),
(18, 18, 0.04),
(19, 19, 0.04),
(20, 20, 0.04),
(21, 21, 0.04),
(22, 22, 0.04),
(23, 23, 0.04),
(24, 24, 0.04),
(25, 25, 0.04);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D4E6F81A76ED395` (`user_id`);

--
-- Index pour la table `admin_order`
--
ALTER TABLE `admin_order`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `admin_order_item`
--
ALTER TABLE `admin_order_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_9AD4B98C193F6A3E` (`admin_order_id`),
  ADD KEY `IDX_9AD4B98C7975B7E7` (`model_id`);

--
-- Index pour la table `anonymous_cart`
--
ALTER TABLE `anonymous_cart`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_61E17AD55F37A13B` (`token`);

--
-- Index pour la table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_1C52F9584584665A` (`product_id`);

--
-- Index pour la table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_BA388B7A76ED395` (`user_id`);

--
-- Index pour la table `cart_item`
--
ALTER TABLE `cart_item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F0FE25271AD5CDBF` (`cart_id`),
  ADD KEY `IDX_F0FE2527EFDE7118` (`anonymous_cart_id`),
  ADD KEY `IDX_F0FE25274584665A` (`product_id`),
  ADD KEY `IDX_F0FE25277975B7E7` (`model_id`);

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `category_size`
--
ALTER TABLE `category_size`
  ADD PRIMARY KEY (`category_id`,`size_id`),
  ADD KEY `IDX_7C5B5E2D12469DE2` (`category_id`),
  ADD KEY `IDX_7C5B5E2D498DA827` (`size_id`);

--
-- Index pour la table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `dimension`
--
ALTER TABLE `dimension`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_CA9BC19C498DA827` (`size_id`);

--
-- Index pour la table `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `model`
--
ALTER TABLE `model`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D79572D94584665A` (`product_id`),
  ADD KEY `IDX_D79572D97ADA1FB5` (`color_id`),
  ADD KEY `IDX_D79572D9498DA827` (`size_id`);

--
-- Index pour la table `model_image`
--
ALTER TABLE `model_image`
  ADD PRIMARY KEY (`model_id`,`image_id`),
  ADD KEY `IDX_FB7E24A87975B7E7` (`model_id`),
  ADD KEY `IDX_FB7E24A83DA5256D` (`image_id`);

--
-- Index pour la table `musicoin`
--
ALTER TABLE `musicoin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_FD25B79DA76ED395` (`user_id`);

--
-- Index pour la table `music_track`
--
ALTER TABLE `music_track`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_F5299398A76ED395` (`user_id`);

--
-- Index pour la table `order_address`
--
ALTER TABLE `order_address`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_FB34C6CA8D9F6D38` (`order_id`);

--
-- Index pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_62809DB08D9F6D38` (`order_id`);

--
-- Index pour la table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_D34A04AD12469DE2` (`category_id`);

--
-- Index pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_C11D7DD17975B7E7` (`model_id`),
  ADD KEY `IDX_C11D7DD14584665A` (`product_id`);

--
-- Index pour la table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_794381C64584665A` (`product_id`),
  ADD KEY `IDX_794381C67975B7E7` (`model_id`),
  ADD KEY `IDX_794381C6A76ED395` (`user_id`);

--
-- Index pour la table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_4B3656604584665A` (`product_id`),
  ADD KEY `IDX_4B3656607ADA1FB5` (`color_id`),
  ADD KEY `IDX_4B365660498DA827` (`size_id`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_389B7834584665A` (`product_id`);

--
-- Index pour la table `transport_provider`
--
ALTER TABLE `transport_provider`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`);

--
-- Index pour la table `weight`
--
ALTER TABLE `weight`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7CD55414584665A` (`product_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `admin_order`
--
ALTER TABLE `admin_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT pour la table `admin_order_item`
--
ALTER TABLE `admin_order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT pour la table `anonymous_cart`
--
ALTER TABLE `anonymous_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT pour la table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `dimension`
--
ALTER TABLE `dimension`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT pour la table `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `musicoin`
--
ALTER TABLE `musicoin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `music_track`
--
ALTER TABLE `music_track`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT pour la table `order_address`
--
ALTER TABLE `order_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=95;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `transport_provider`
--
ALTER TABLE `transport_provider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `weight`
--
ALTER TABLE `weight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `address`
--
ALTER TABLE `address`
  ADD CONSTRAINT `FK_D4E6F81A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `admin_order_item`
--
ALTER TABLE `admin_order_item`
  ADD CONSTRAINT `FK_9AD4B98C193F6A3E` FOREIGN KEY (`admin_order_id`) REFERENCES `admin_order` (`id`),
  ADD CONSTRAINT `FK_9AD4B98C7975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`);

--
-- Contraintes pour la table `brand`
--
ALTER TABLE `brand`
  ADD CONSTRAINT `FK_1C52F9584584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Contraintes pour la table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `FK_BA388B7A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `cart_item`
--
ALTER TABLE `cart_item`
  ADD CONSTRAINT `FK_F0FE25271AD5CDBF` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `FK_F0FE25274584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_F0FE25277975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_F0FE2527EFDE7118` FOREIGN KEY (`anonymous_cart_id`) REFERENCES `anonymous_cart` (`id`) ON DELETE SET NULL;

--
-- Contraintes pour la table `category_size`
--
ALTER TABLE `category_size`
  ADD CONSTRAINT `FK_7C5B5E2D12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_7C5B5E2D498DA827` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `dimension`
--
ALTER TABLE `dimension`
  ADD CONSTRAINT `FK_CA9BC19C498DA827` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`);

--
-- Contraintes pour la table `model`
--
ALTER TABLE `model`
  ADD CONSTRAINT `FK_D79572D94584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_D79572D9498DA827` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`),
  ADD CONSTRAINT `FK_D79572D97ADA1FB5` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

--
-- Contraintes pour la table `model_image`
--
ALTER TABLE `model_image`
  ADD CONSTRAINT `FK_FB7E24A83DA5256D` FOREIGN KEY (`image_id`) REFERENCES `image` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_FB7E24A87975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `musicoin`
--
ALTER TABLE `musicoin`
  ADD CONSTRAINT `FK_FD25B79DA76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `order`
--
ALTER TABLE `order`
  ADD CONSTRAINT `FK_F5299398A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `order_address`
--
ALTER TABLE `order_address`
  ADD CONSTRAINT `FK_FB34C6CA8D9F6D38` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

--
-- Contraintes pour la table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `FK_62809DB08D9F6D38` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`);

--
-- Contraintes pour la table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `FK_D34A04AD12469DE2` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`);

--
-- Contraintes pour la table `promotion`
--
ALTER TABLE `promotion`
  ADD CONSTRAINT `FK_C11D7DD14584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_C11D7DD17975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`);

--
-- Contraintes pour la table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `FK_794381C64584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_794381C67975B7E7` FOREIGN KEY (`model_id`) REFERENCES `model` (`id`),
  ADD CONSTRAINT `FK_794381C6A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Contraintes pour la table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `FK_4B3656604584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  ADD CONSTRAINT `FK_4B365660498DA827` FOREIGN KEY (`size_id`) REFERENCES `size` (`id`),
  ADD CONSTRAINT `FK_4B3656607ADA1FB5` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`);

--
-- Contraintes pour la table `tag`
--
ALTER TABLE `tag`
  ADD CONSTRAINT `FK_389B7834584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);

--
-- Contraintes pour la table `weight`
--
ALTER TABLE `weight`
  ADD CONSTRAINT `FK_7CD55414584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
