-- Tablas de la base de datos admitidos_api
-- Pegar todo esto en phpMyAdmin > admitidos_api > pestaña SQL > Continuar

-- Tabla de facultades (la que ya usa tu codigo)
CREATE TABLE IF NOT EXISTS facultades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de programas (la siguiente que vas a necesitar)
-- cada programa pertenece a una facultad (facultad_id)
CREATE TABLE IF NOT EXISTS programas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    nombre VARCHAR(120) NOT NULL,
    nivel ENUM('pregrado', 'posgrado', 'otros') NOT NULL,
    facultad_id INT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    -- no se puede repetir el mismo nombre dentro de la misma facultad
    UNIQUE (facultad_id, nombre),
    FOREIGN KEY (facultad_id) REFERENCES facultades(id)
);

-- Datos de prueba (los mismos que tenias en los arreglos)
INSERT INTO facultades (nombre) VALUES
    ('Facultad de Ingeniería'),
    ('Facultad de Ciencias Sociales'),
    ('Facultad de Ciencias de la Salud'),
    ('Facultad de Arquitectura y Urbanismo');

INSERT INTO programas (codigo, nombre, nivel, facultad_id) VALUES
    ('PROG-0001', 'Ingeniería de Sistemas', 'pregrado', 1),
    ('PROG-0002', 'Ingeniería Civil', 'pregrado', 1),
    ('PROG-0003', 'Ingeniería Industrial', 'pregrado', 1),
    ('PROG-0004', 'Psicología', 'pregrado', 2);
