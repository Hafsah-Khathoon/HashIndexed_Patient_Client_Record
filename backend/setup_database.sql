-- MySQL Database Setup Script
-- Run this script to create the database and table manually if needed

-- Create database
CREATE DATABASE IF NOT EXISTS hospital_db;
USE hospital_db;

-- Create patients table
CREATE TABLE IF NOT EXISTS patients (
    pid VARCHAR(50) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT NOT NULL,
    gender VARCHAR(20) NOT NULL,
    disease VARCHAR(200) NOT NULL,
    doctor VARCHAR(100) NOT NULL,
    hash_index INT NOT NULL,
    INDEX idx_hash_index (hash_index)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Show table structure
DESCRIBE patients;

