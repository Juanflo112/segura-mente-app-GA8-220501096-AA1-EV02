const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

// Cargar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();

// ==================== MIDDLEWARES ====================

// CORS - Permitir peticiones desde el frontend
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true
}));

// Body parser - Para leer JSON y datos de formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging de peticiones (desarrollo)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ==================== RUTAS ====================

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        success: true,
        message: 'API Segura-Mente funcionando correctamente',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Rutas de gestión de usuarios
app.use('/api/users', userRoutes);

// ==================== MANEJO DE ERRORES ====================

// Ruta no encontrada (404)
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Ruta no encontrada',
        path: req.path
    });
});

// Manejador de errores global
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? error : undefined
    });
});

// ==================== INICIAR SERVIDOR ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('SERVIDOR SEGURA-MENTE INICIADO');
    console.log('═══════════════════════════════════════════');
    console.log(`Puerto: ${PORT}`);
    console.log(`URL: http://localhost:${PORT}`);
    console.log(`Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Email configurado: ${process.env.EMAIL_USER || 'No configurado'}`);
    console.log('═══════════════════════════════════════════');
    console.log('');
});

// Manejo de cierre graceful
process.on('SIGTERM', () => {
    console.log('Cerrando servidor...');
    process.exit(0);
});

module.exports = app;
