-- Supabase / PostgreSQL schema for Segura-Mente App
-- Paste this into the Supabase SQL Editor or run with psql.

-- Tabla de usuarios con email como PRIMARY KEY
CREATE TABLE IF NOT EXISTS usuarios (
    email VARCHAR(150) PRIMARY KEY,
    nombre_usuario VARCHAR(100) NOT NULL UNIQUE,
    tipo_identificacion VARCHAR(5) NOT NULL,
    identificacion VARCHAR(50) NOT NULL UNIQUE,
    fecha_nacimiento DATE NOT NULL,
    telefono VARCHAR(20) NOT NULL,
    direccion VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) DEFAULT 'Cliente',
    formacion_profesional VARCHAR(255),
    tarjeta_profesional VARCHAR(100),
    password VARCHAR(255) NOT NULL,
    verificado BOOLEAN DEFAULT FALSE,
    token_verificacion VARCHAR(255),
    token_recuperacion VARCHAR(255),
    token_recuperacion_expira TIMESTAMP NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_nombre_usuario ON usuarios(nombre_usuario);
CREATE INDEX IF NOT EXISTS idx_identificacion ON usuarios(identificacion);
CREATE INDEX IF NOT EXISTS idx_token_verificacion ON usuarios(token_verificacion);
CREATE INDEX IF NOT EXISTS idx_token_recuperacion ON usuarios(token_recuperacion);

-- Seguridad en Supabase

ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;


