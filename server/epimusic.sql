-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : mar. 11 mars 2025 à 09:13
-- Version du serveur : 5.7.39
-- Version de PHP : 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `epimusic`
--

-- --------------------------------------------------------

--
-- Structure de la table `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_primary` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `address`
--

INSERT INTO `address` (`id`, `user_id`, `name`, `telephone`, `address`, `complement`, `postal_code`, `city`, `country`, `is_primary`) VALUES
(3, 2, 'Test TEST', '1234567890', '123 Rue de Test', '', '75000', 'Paris', 'France', 1),
(6, 6, 'John Doe', '1234567890', '123 Rue de Test', '', '59000', 'Lille', 'France', 1),
(7, 6, 'Test', '1234567890', '123 Rue de Test', 'Appt 3', '75000', 'Paris', 'France', 0);

-- --------------------------------------------------------

--
-- Structure de la table `admin_order`
--

CREATE TABLE `admin_order` (
  `id` int(11) NOT NULL,
  `order_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `delivery_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_order`
--

INSERT INTO `admin_order` (`id`, `order_number`, `status`, `created_at`, `update_at`, `delivery_date`) VALUES
(54, 'XOTI3RD9K4D4K', 'livré', '2024-09-02 13:24:51', '2024-09-02 13:24:51', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `admin_order_item`
--

CREATE TABLE `admin_order_item` (
  `id` int(11) NOT NULL,
  `model_id` int(11) DEFAULT NULL,
  `admin_order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `model_color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `model_size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_main` tinyint(1) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `admin_order_item`
--

INSERT INTO `admin_order_item` (`id`, `model_id`, `admin_order_id`, `product_id`, `model_color`, `model_size`, `is_main`, `quantity`) VALUES
(42, 18, 54, 18, NULL, '45', 1, 11);

-- --------------------------------------------------------

--
-- Structure de la table `anonymous_cart`
--

CREATE TABLE `anonymous_cart` (
  `id` int(11) NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `anonymous_cart`
--

INSERT INTO `anonymous_cart` (`id`, `token`, `created_at`, `updated_at`, `total`) VALUES
(1, '5d842fc7de88b28282bf370956dff260', '2024-08-20 10:05:44', NULL, 1333.68),
(2, '07bcaf014abd15b55f0222c3770bf0ca', '2024-08-26 13:46:30', NULL, 37.99);

-- --------------------------------------------------------

--
-- Structure de la table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `promo_total` double NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `cart`
--

INSERT INTO `cart` (`id`, `user_id`, `created_at`, `updated_at`, `total`, `promo_total`) VALUES
(6, 1, '2024-08-21 13:05:57', '2024-09-02 13:56:05', 49.99, 0),
(19, 2, '2024-09-01 18:45:49', '2024-09-01 18:45:49', 469.99, 0),
(22, 6, '2024-09-02 13:51:16', '2024-09-02 13:51:16', 42.98, 0);

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
(34, NULL, 2, 18, 18, 1, 37.99, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `weight_unit` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `category`
--

INSERT INTO `category` (`id`, `name`, `weight_unit`, `image_path`) VALUES
(1, 'Instrument', NULL, '/uploads/category_1.jpg'),
(2, 'Vinyle', NULL, '/uploads/category_2.jpg'),
(3, 'Goodies', NULL, '/uploads/category_3.jpeg');

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
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `version` varchar(191) COLLATE utf8_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_main` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `image`
--

INSERT INTO `image` (`id`, `path`, `is_main`) VALUES
(1, '/uploads/1_0.jpg', 1),
(2, '/uploads/1_1.jpg', 0),
(3, '/uploads/1_2.jpg', 0),
(4, '/uploads/2_0.jpg', 1),
(5, '/uploads/2_1.jpg', 0),
(6, '/uploads/2_2.jpg', 0),
(7, '/uploads/2_3.jpg', 0),
(8, '/uploads/3_0.jpg', 1),
(9, '/uploads/3_1.jpg', 0),
(10, '/uploads/3_2.png', 0),
(11, '/uploads/4_0.jpg', 1),
(12, '/uploads/4_1.jpg', 0),
(13, '/uploads/4_2.jpg', 0),
(14, '/uploads/4_3.jpg', 0),
(15, '/uploads/5_0.jpg', 1),
(16, '/uploads/5_1.jpg', 0),
(17, '/uploads/6_0.jpg', 1),
(18, '/uploads/6_1.jpg', 0),
(19, '/uploads/7_0.jpg', 1),
(20, '/uploads/8_0.jpg', 1),
(21, '/uploads/8_1.jpg', 0),
(22, '/uploads/9_0.jpg', 1),
(23, '/uploads/10_0.jpg', 1),
(24, '/uploads/11_0.jpg', 1),
(25, '/uploads/11_1.jpg', 0),
(26, '/uploads/12_0.jpg', 1),
(27, '/uploads/13_0.jpg', 1),
(28, '/uploads/14_0.jpg', 1),
(29, '/uploads/15_0.jpg', 1),
(30, '/uploads/16_0.jpg', 1),
(31, '/uploads/16_1.jpg', 0),
(32, '/uploads/17_0.jpg', 1),
(33, '/uploads/17_1.jpg', 0),
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
(25, 25, NULL, 1, 39.99, 0.04),
(28, 18, NULL, 1, 12, NULL);

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
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
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
  `payment_method` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
(28, 45, NULL, 'Pending', 'Pending', '2024-09-02 13:30:36', '2024-09-02 13:30:36', 17.97, 45, 62.97, 6),
(29, 35.9, 'Carte Visa', 'Pending', 'Annulé', '2024-09-02 13:31:53', '2024-09-02 13:31:53', 7.01, 35.9, 42.91, 6),
(30, 42.98, NULL, 'Pending', 'Pending', '2024-09-02 13:51:43', '2024-09-02 13:51:43', 5.98, 42.98, 48.96, 6),
(31, 27.99, NULL, 'Pending', 'Pending', '2024-09-02 13:53:28', '2024-09-02 13:53:28', 2.99, 27.99, 30.98, 6),
(32, 111.96, NULL, 'Pending', 'Pending', '2024-09-02 13:54:01', '2024-09-02 13:54:01', 11.96, 111.96, 123.92, 6);

-- --------------------------------------------------------

--
-- Structure de la table `order_address`
--

CREATE TABLE `order_address` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `complement` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `postal_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `order_address`
--

INSERT INTO `order_address` (`id`, `order_id`, `name`, `telephone`, `email`, `address`, `complement`, `postal_code`, `city`, `country`) VALUES
(21, 28, 'John Doe', '1234567890', 'john@test.com', '123 Rue de Test', '', '59000', 'Lille', 'France'),
(22, 29, 'John Doe', '1234567890', 'john@test.com', '123 Rue de Test', '', '59000', 'Lille', 'France');

-- --------------------------------------------------------

--
-- Structure de la table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `size` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
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
(40, 28, 'T-SHIRT FLUTE TRAVERSIERE', 'Noir', NULL, 3, 15, 45, NULL, 0, NULL, 10),
(41, 29, 'T-Shirt Thrash Metal Manches Courtes METALLICA \"Ride Back Print\"', 'Noir', NULL, 1, 22, 22, NULL, 0, NULL, 11),
(42, 29, 'Tasse Métal Émaillé AC/DC - Logo', 'Noir', NULL, 1, 13, 13.9, NULL, 0, NULL, 16),
(43, 30, 'Metallica - Kill\\\'em All- Vinyle standard', NULL, NULL, 1, 27, 27.99, NULL, 0, NULL, 20),
(44, 30, 'Les Bronzés font du ski - Bande Originale - Maxi 45T - Vinyle blanc', NULL, NULL, 1, 14, 14.99, NULL, 0, NULL, 21),
(45, 31, 'Metallica - Kill\\\'em All- Vinyle standard', NULL, NULL, 1, 27, 27.99, NULL, 0, NULL, 20),
(46, 32, 'Metallica - Kill\\\'em All- Vinyle standard', NULL, NULL, 4, 27, 111.96, NULL, 0, NULL, 20);

-- --------------------------------------------------------

--
-- Structure de la table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` longtext COLLATE utf8mb4_unicode_ci NOT NULL
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
(1, 24, NULL, '10.00', '2024-09-02 00:00:00', '2024-09-03 00:00:00', 1);

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
  `comment` varchar(1000) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `size`
--

CREATE TABLE `size` (
  `id` int(11) NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unit` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
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
(17, 17, 1, NULL, 10),
(18, 18, NULL, 2, 11),
(19, 19, NULL, 1, 7),
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
(92, 2, 9, NULL, 9),
(97, 18, NULL, 1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `transport_provider`
--

CREATE TABLE `transport_provider` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
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
  `first_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `roles` json NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `roles`, `password`, `is_verified`) VALUES
(1, 'admin', 'Admin', 'admin@test.com', '[\"ROLE_ADMIN\"]', '$2y$13$TQHZJOf.udLo4mg1CYVWBe3ewW75I0YbHXNAzRr6sRmnQ7lgE391O', 0),
(2, 'Test', 'Test', 'test@test.com', '[\"ROLE_USER\"]', '$2y$13$33gjjEmEDHoyneuwUFNd6u.Orm/1dKhlm2W7tuz7hFitbhYGPIQ8O', 0),
(6, 'John', 'Doe', 'john@test.com', '[\"ROLE_USER\"]', '$2y$13$K/3F2gdvm/CNsx81bjXefemIJLP/D2zYYNPoUQhUoyed85kNX6Clm', 0);

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
  ADD UNIQUE KEY `UNIQ_9AD4B98C4584665A` (`product_id`),
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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `admin_order`
--
ALTER TABLE `admin_order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT pour la table `admin_order_item`
--
ALTER TABLE `admin_order_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT pour la table `anonymous_cart`
--
ALTER TABLE `anonymous_cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT pour la table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `cart_item`
--
ALTER TABLE `cart_item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT pour la table `model`
--
ALTER TABLE `model`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT pour la table `order_address`
--
ALTER TABLE `order_address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT pour la table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT pour la table `promotion`
--
ALTER TABLE `promotion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `review`
--
ALTER TABLE `review`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `size`
--
ALTER TABLE `size`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `weight`
--
ALTER TABLE `weight`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

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
  ADD CONSTRAINT `FK_9AD4B98C4584665A` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
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
