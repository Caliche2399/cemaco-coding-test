-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS myapp
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
USE myapp;

-- Crear tabla de roles
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    rol VARCHAR(100) NOT NULL
);

-- Crear tabla de usuarios con relación a roles
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    usuario VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    email VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL UNIQUE,
    password VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    rol_id INT,
    FOREIGN KEY (rol_id) REFERENCES roles(id)
);

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
    descripcion TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    precio DECIMAL(10,2) NOT NULL,
    sku VARCHAR(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci UNIQUE NOT NULL,
    inventario INT NOT NULL DEFAULT 0,
    imagen VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
);

-- Insertar roles
INSERT INTO roles (rol) VALUES ('Administrador');
INSERT INTO roles (rol) VALUES ('Colaborador');

-- Insertar usuarios con rol_id correspondiente
INSERT INTO usuarios (nombre, usuario, email, password, rol_id) VALUES
('Carlos Aguilar', 'admin', 'admin@example.com', 'admin', 1),
('Cemaco', 'user', 'usuario@example.com', 'user', 2);

INSERT INTO productos (nombre, descripcion, precio, sku, inventario, imagen) VALUES
('Silla Ergonómica', 'Silla de oficina ergonómica con soporte lumbar', 125.50, 'SKU-001', 10, 'https://miapp.com/images/silla.jpg'),
('Escritorio Moderno', 'Escritorio de madera con acabado moderno', 299.99, 'SKU-002', 5, 'https://miapp.com/images/escritorio.jpg');