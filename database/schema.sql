-- ============================================================================
-- AL FAKHAMA (HARV FRIES) - MYSQL DATABASE SCHEMA FOR HOSTINGER
-- Compatible with Hostinger hPanel MySQL 5.7+ / 8.0+ / MariaDB
-- ============================================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Table: rfq_inquiries (B2B Request for Quote & Customer Inquiries)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rfq_inquiries` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `full_name` VARCHAR(255) NOT NULL,
  `company_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone_whatsapp` VARCHAR(100) NOT NULL,
  `country_destination` VARCHAR(255) NOT NULL,
  `product_cut` VARCHAR(100) NOT NULL,
  `estimated_volume` VARCHAR(100) NOT NULL,
  `message` TEXT NULL,
  `status` ENUM('new', 'contacted', 'in_progress', 'completed', 'archived') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) NULL,
  `user_agent` VARCHAR(500) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status`),
  INDEX `idx_email` (`email`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- Optional Seed Sample for Initial Testing
-- ----------------------------------------------------------------------------
INSERT INTO `rfq_inquiries` 
  (`full_name`, `company_name`, `email`, `phone_whatsapp`, `country_destination`, `product_cut`, `estimated_volume`, `message`, `status`) 
VALUES 
  ('Ahmad Mansour', 'Gulf Foodservice Supplies', 'a.mansour@gulffood.ae', '+971 50 123 4567', 'United Arab Emirates (Jebel Ali Port)', '7x7mm Shoestring (Par-Fried Frozen)', '1x 40ft Reefer Container (~25-28 Metric Tons)', 'Looking for scheduled monthly reefer shipments of 7mm par-fried fries. Please provide CIF Jebel Ali quotation.', 'new');

-- ----------------------------------------------------------------------------
-- Table: admin_users (Authority, Role-Based Access & Admin Authentication)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `admin_users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(60) NOT NULL UNIQUE,
  `email` VARCHAR(120) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(100) NOT NULL,
  `role` ENUM('super_admin', 'admin', 'editor') NOT NULL DEFAULT 'super_admin',
  `status` ENUM('active', 'suspended') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_username` (`username`),
  INDEX `idx_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed for Super Admin (Default password: Alfakhama2026@GoldFries)
INSERT INTO `admin_users` 
  (`username`, `email`, `password_hash`, `full_name`, `role`, `status`)
VALUES 
  ('admin', 'admin@alfakhama-fries.com', '$2y$10$eA09yvQ6xR5uH0uS.Z53..u7mE2mQe5eU2l1q8f9d0c1b2a3b4c5d', 'Al Fakhama Admin', 'super_admin', 'active')
ON DUPLICATE KEY UPDATE `username`=`username`;

-- ----------------------------------------------------------------------------
-- Table: rate_limit (API Rate Limiting - Auto-managed by rate_limit.php)
-- NOTE: This table is also auto-created by PHP on first API call.
--       Run this manually on Hostinger if you want to pre-create it.
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `rate_limit` (
  `id`           BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `ip`           VARCHAR(45)  NOT NULL,
  `endpoint`     VARCHAR(64)  NOT NULL,
  `hits`         INT UNSIGNED NOT NULL DEFAULT 1,
  `window_start` DATETIME     NOT NULL,
  INDEX `idx_ip_endpoint` (`ip`, `endpoint`),
  INDEX `idx_window`      (`window_start`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional: Schedule this cleanup event on MySQL to auto-purge old records
-- (Only works if MySQL Event Scheduler is enabled on Hostinger)
-- CREATE EVENT IF NOT EXISTS `cleanup_rate_limit`
--   ON SCHEDULE EVERY 1 HOUR
--   DO DELETE FROM `rate_limit` WHERE `window_start` < DATE_SUB(NOW(), INTERVAL 1 HOUR);

