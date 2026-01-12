const mysql = require('mysql2');
require('dotenv').config();

// Crear pool de conexiones para mejor rendimiento
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Convertir a promesas para usar async/await
const promisePool = pool.promise();

// Verificar conexión
promisePool.query('SELECT 1')
    .then(() => {
        console.log('Conexión exitosa a la base de datos MySQL');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

module.exports = promisePool;
