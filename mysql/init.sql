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
    imagen VARCHAR(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci
    );

-- Insertar roles
INSERT INTO roles (rol) VALUES ('Administrador');
INSERT INTO roles (rol) VALUES ('Colaborador');

-- Insertar usuarios con rol_id correspondiente
INSERT INTO usuarios (nombre, usuario, email, password, rol_id) VALUES
                                                                    ('Carlos Aguilar', 'admin', 'admin@example.com', 'admin', 1),
                                                                    ('Cemaco', 'user', 'usuario@example.com', 'user', 2);

INSERT INTO productos (nombre, descripcion, precio, sku, inventario, imagen) VALUES
                                                                                 ('Escritorio Moderno', 'Escritorio moderno para oficina o casa color cafe oscuro', 89.99, 'SKU-003', 15, 'https://i.pinimg.com/564x/93/56/35/935635c1b30b484a7f0a7d5f2f4a583d.jpg'),
                                                                                 ('Silla Gamer Ergonómica', 'Silla con respaldo alto, cojín lumbar y ruedas giratorias', 450.00, 'SKU-004', 7, 'https://www.officedepot.com.gt/medias/39016.jpg-1200ftw?context=bWFzdGVyfHJvb3R8MjY1NjYzfGltYWdlL2pwZWd8YUdNekwyZzJNaTh4TURVd056Z3pORFk0TnpVeE9DOHpPVEF4Tmk1cWNHZGZNVEl3TUdaMGR3fDY5OTlmNDBlZmU1NGNhNzFmZWNmMGQ2MTlmOWFkYmZjZTNhOWU0MWI2OTBhZWQ0YWMxMDlmZTE4MGY5NTRjZTY'),
                                                                                 ('Organizador de Escritorio', 'Organizador multiusos de plástico resistente con compartimentos', 45.25, 'SKU-005', 30, 'https://officedepot.gumlet.io/product-images/2022/09/41279-1.jpg?w=360'),
                                                                                 ('Alfombra Antideslizante', 'Alfombra para oficina o entrada con diseño moderno', 110.00, 'SKU-006', 12, 'https://i.pinimg.com/originals/6b/46/1f/6b461f3a438be857fc453de46e1eaad3.jpg'),
                                                                                 ('Librera de 5 niveles', 'Estantería vertical en madera color roble', 210.49, 'SKU-007', 8, 'https://http2.mlstatic.com/D_NQ_NP_986844-MLU72738799984_112023-O.webp'),
                                                                                 ('Monitor LED 24 pulgadas', 'Monitor Full HD con entradas HDMI y VGA', 799.99, 'SKU-008', 6, 'https://img.global.news.samsung.com/cl/wp-content/uploads/2022/03/Monitor_Samsung_Gaming_Odyssey.jpg'),
                                                                                 ('Teclado Mecánico RGB', 'Teclado con retroiluminación y switches azules', 299.95, 'SKU-009', 20, 'https://cdn11.bigcommerce.com/s-dhd68/images/stencil/1280x1280/products/306/2061/TM-KGRD__23732.1623333680.jpg?c=2'),
                                                                                 ('Mouse Inalámbrico', 'Mouse ergonómico con sensor óptico y batería recargable', 79.99, 'SKU-010', 18, 'https://i5.walmartimages.com.mx/mg/gm/3pp/asr/0d6ed0b8-3ffb-4062-b19a-1097ed491755.dae4aebd8b4c0c894d9c44f77aa05e2a.jpeg'),
                                                                                 ('Pizarra Blanca Magnética', 'Pizarra de 90x60 cm con superficie para marcadores y accesorios', 145.00, 'SKU-011', 9, 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/500dc9c888c6b99fd28283058ad2f71e.jpg'),
                                                                                 ('Archivador Metálico', 'Archivador de 3 gavetas con cerradura de seguridad', 349.99, 'SKU-012', 4, 'https://m.media-amazon.com/images/I/51MzAsVZZqL.jpg');
