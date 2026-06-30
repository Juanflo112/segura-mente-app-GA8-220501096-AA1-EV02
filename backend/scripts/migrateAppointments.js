/**
 * Crea la tabla de citas en la base de datos configurada en .env
 * Uso: node backend/scripts/migrateAppointments.js
 */

const mysql = require('mysql2/promise');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS citas (
    id                     VARCHAR(36)  PRIMARY KEY,
    client_email           VARCHAR(150) NOT NULL,
    client_name            VARCHAR(100) NOT NULL,
    date                   DATE         NOT NULL,
    time                   VARCHAR(10)  NOT NULL,
    psychologist_email     VARCHAR(150) NOT NULL,
    psychologist_name      VARCHAR(100) NOT NULL,
    psychologist_specialty VARCHAR(255) DEFAULT 'Psicólogo/a',
    notes                  TEXT,
    status                 ENUM('Agendada', 'Cancelada') DEFAULT 'Agendada',
    created_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at             TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_citas_client       (client_email),
    INDEX idx_citas_psychologist (psychologist_email),
    INDEX idx_citas_status       (status),
    INDEX idx_citas_date         (date)
)
`;

async function migrate() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined
        });

        console.log('Conectado a la base de datos:', process.env.DB_NAME);
        await connection.execute(CREATE_TABLE_SQL);
        console.log('Tabla "citas" creada o ya existente. Listo.');
    } catch (error) {
        console.error('Error durante la migración:', error.message);
        process.exit(1);
    } finally {
        if (connection) await connection.end();
    }
}

migrate();
