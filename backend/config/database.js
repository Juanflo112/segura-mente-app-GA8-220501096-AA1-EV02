const { Pool } = require('pg');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL no está definida. Revisa las variables de entorno de Render o tu archivo .env.');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_SSL === 'true'
        ? { rejectUnauthorized: false }
        : false,
    max: 10,
    keepAlive: true,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 60000,
    maxUses: 5000
});

pool.on('error', (error) => {
    console.error('Error inesperado en el pool PostgreSQL:', error.message);
});

const isSelectQuery = (sql) => /^(\s*)(SELECT|WITH|SHOW|EXPLAIN)\b/i.test(sql);

const isRetryableConnectionError = (error) => {
    const message = (error && error.message ? error.message : '').toLowerCase();
    const code = error && error.code;

    return [
        '57p01',
        '57p02',
        '57p03',
        'ecconnreset',
        'econnreset',
        'etimedout'
    ].includes(String(code).toLowerCase()) ||
        message.includes('connection lost') ||
        message.includes('server closed the connection') ||
        message.includes('connection terminated unexpectedly') ||
        message.includes('terminating connection') ||
        message.includes('connection reset by peer');
};

const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

const translatePlaceholders = (sql) => {
    let index = 0;
    return sql.replace(/\?/g, () => `$${++index}`);
};

const runQuery = async (sql, params = []) => {
    const translatedSql = translatePlaceholders(sql);
    return pool.query(translatedSql, params);
};

const query = async (sql, params = []) => {
    try {
        const result = await runQuery(sql, params);

        if (isSelectQuery(sql)) {
            return [result.rows];
        }

        return [{
            affectedRows: result.rowCount,
            rowCount: result.rowCount,
            insertId: result.rows[0]?.id ?? null
        }];
    } catch (error) {
        if (isRetryableConnectionError(error)) {
            console.warn('Reintentando consulta PostgreSQL tras error de conexión:', error.message);
            await wait(250);

            const retryResult = await runQuery(sql, params);

            if (isSelectQuery(sql)) {
                return [retryResult.rows];
            }

            return [{
                affectedRows: retryResult.rowCount,
                rowCount: retryResult.rowCount,
                insertId: retryResult.rows[0]?.id ?? null
            }];
        }

        throw error;
    }
};

pool.query('SELECT 1')
    .then(() => {
        console.log('Conexión exitosa a la base de datos PostgreSQL');
    })
    .catch((error) => {
        console.error('Error al conectar a la base de datos:', error.message);
    });

module.exports = {
    query,
    pool
};
