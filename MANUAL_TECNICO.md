# Manual Técnico - Segura Mente App

## 📘 Información del Documento

**Proyecto:** Segura Mente - Sistema de Gestión de Usuarios  
**Versión:** 1.0.0  
**Fecha:** Enero 12, 2026  
**Estudiante:** Juan Felipe  
**Evidencia:** GA8-220501096-AA1-EV02 - Módulos Integrados  
**Tipo:** Manual Técnico para Desarrolladores y Administradores

---

## 📋 Índice

1. [Arquitectura del Sistema](#arquitectura-del-sistema)
2. [Instalación y Configuración Local](#instalación-y-configuración-local)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Base de Datos](#base-de-datos)
6. [API REST - Endpoints](#api-rest---endpoints)
7. [Autenticación y Seguridad](#autenticación-y-seguridad)
8. [Deployment](#deployment)
9. [Mantenimiento y Troubleshooting](#mantenimiento-y-troubleshooting)
10. [Escalabilidad y Mejoras Futuras](#escalabilidad-y-mejoras-futuras)

---

## 1. Arquitectura del Sistema

### 1.1 Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         USUARIO FINAL                        │
│                      (Navegador Web)                         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                    FRONTEND (React)                          │
│                  Vercel Cloud Platform                       │
│  URL: segura-mente-app-frontend.vercel.app                   │
│                                                              │
│  - React 19.2.0                                              │
│  - React Router 7.10.1                                       │
│  - Axios para peticiones HTTP                                │
│  - LocalStorage para JWT                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API (HTTPS)
                         │ CORS Enabled
                         │
┌────────────────────────▼────────────────────────────────────┐
│                 BACKEND (Node.js + Express)                  │
│                   Render Cloud Platform                      │
│  URL: segura-mente-app-ga8-220501096-aa1-ev02.onrender.com  │
│                                                              │
│  - Express 5.2.1                                             │
│  - JWT Authentication                                        │
│  - Bcrypt Password Hashing                                   │
│  - MySQL2 Driver                                             │
│  - Nodemailer (Email)                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ MySQL Connection (SSL)
                         │
┌────────────────────────▼────────────────────────────────────┐
│                  BASE DE DATOS (MySQL 8.0)                   │
│                   Railway Cloud Platform                     │
│  Host: caboose.proxy.rlwy.net:43186                          │
│                                                              │
│  - Tabla: usuarios                                           │
│  - Índices optimizados                                       │
│  - SSL Required                                              │
│  - Public Networking Enabled                                 │
└──────────────────────────────────────────────────────────────┘
```

### 1.2 Patrón de Diseño

**Arquitectura:** Modelo-Vista-Controlador (MVC) Distribuido

- **Modelo (Model):** `backend/models/User.js` - Lógica de datos y consultas SQL
- **Vista (View):** `src/components/**/*.jsx` - Componentes React
- **Controlador (Controller):** `backend/controllers/**/*.js` - Lógica de negocio

**Separación de Responsabilidades:**
- Frontend: Presentación e interacción con usuario
- Backend: Lógica de negocio, validaciones, autenticación
- Database: Persistencia y almacenamiento

---

## 2. Instalación y Configuración Local

### 2.1 Requisitos Previos

```bash
Node.js: v18.0.0 o superior
npm: v9.0.0 o superior
MySQL: v8.0 o superior
Git: v2.30.0 o superior
```

### 2.2 Clonar el Repositorio

```bash
# Clonar desde GitHub
git clone https://github.com/Juanflo112/segura-mente-app-GA8-220501096-AA1-EV02.git

# Navegar al directorio
cd segura-mente-app-GA8-220501096-AA1-EV02
```

### 2.3 Configuración del Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install

# Crear archivo .env
# Copiar el contenido siguiente:
```

**Archivo `backend/.env`:**
```env
# Configuración del servidor
NODE_ENV=development
PORT=5000

# Configuración de la base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password_mysql
DB_NAME=seguramente_db
DB_SSL=false

# JWT Secret (generar uno aleatorio para producción)
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRE=7d

# URL del Frontend (para CORS)
CLIENT_URL=http://localhost:3000

# Configuración de Email (opcional en desarrollo)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=tu_app_password
EMAIL_FROM=noreply@seguramente.com
```

### 2.4 Configuración de la Base de Datos Local

```bash
# Conectar a MySQL
mysql -u root -p

# Crear base de datos
CREATE DATABASE seguramente_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Usar la base de datos
USE seguramente_db;

# Ejecutar el script de creación de tablas
source backend/database.sql;

# Ejecutar migraciones
source backend/migrations/add_employee_fields.sql;
source backend/migrations/add_password_reset_fields.sql;
```

### 2.5 Iniciar el Backend

```bash
# Desde la carpeta backend
npm start

# Deberías ver:
# Server running on port 5000
# MySQL conectado exitosamente
```

### 2.6 Configuración del Frontend

```bash
# Volver a la raíz del proyecto
cd ..

# Instalar dependencias del frontend
npm install

# Crear archivo .env en la raíz
# Copiar el contenido siguiente:
```

**Archivo `.env` (raíz del proyecto):**
```env
REACT_APP_API_URL=http://localhost:5000/api
```

### 2.7 Iniciar el Frontend

```bash
# Desde la raíz del proyecto
npm start

# Se abrirá automáticamente en http://localhost:3000
```

---

## 3. Estructura del Proyecto

### 3.1 Estructura Completa

```
segura-mente-app/
│
├── backend/                          # Servidor Node.js + Express
│   ├── config/
│   │   └── database.js              # Configuración MySQL
│   ├── controllers/
│   │   ├── authController.js        # Lógica de autenticación
│   │   └── userController.js        # Lógica de gestión usuarios
│   ├── middleware/
│   │   └── validation.js            # Validaciones de entrada
│   ├── migrations/
│   │   ├── add_employee_fields.sql  # Migración campos empleado
│   │   └── add_password_reset_fields.sql
│   ├── models/
│   │   └── User.js                  # Modelo de usuario
│   ├── routes/
│   │   ├── auth.js                  # Rutas de autenticación
│   │   └── users.js                 # Rutas de usuarios
│   ├── utils/
│   │   └── email.js                 # Utilidad envío emails
│   ├── database.sql                 # Script inicial DB
│   ├── server.js                    # Punto de entrada backend
│   ├── package.json                 # Dependencias backend
│   └── .env                         # Variables de entorno
│
├── src/                             # Código fuente React
│   ├── components/                  # Componentes reutilizables
│   │   ├── Dashboard/
│   │   │   ├── Sidebar.jsx          # Menú lateral
│   │   │   ├── UserList.jsx         # Lista de usuarios
│   │   │   ├── UserEditForm.jsx     # Formulario edición
│   │   │   └── UserRegisterForm.jsx # Formulario registro admin
│   │   ├── Login/
│   │   │   ├── Login.jsx            # Layout login
│   │   │   └── LoginForm.jsx        # Formulario login
│   │   ├── Register/
│   │   │   ├── RegisterForm.jsx     # Formulario registro
│   │   │   ├── SuccessMessage.jsx   # Mensaje éxito
│   │   │   └── VerificationMessage.jsx
│   │   ├── Logo/
│   │   │   └── Logo.jsx             # Logo de la app
│   │   ├── ProtectedRoute.jsx       # HOC rutas protegidas
│   │   └── SessionWarning.jsx       # Advertencia timeout
│   ├── hooks/
│   │   └── useSessionTimeout.js     # Hook gestión sesión
│   ├── pages/                       # Páginas principales
│   │   ├── DashboardPage.jsx        # Página dashboard
│   │   ├── RegisterPage.jsx         # Página registro
│   │   ├── SuccessPage.jsx          # Página éxito
│   │   └── VerificationPage.jsx     # Página verificación
│   ├── config/
│   │   └── api.js                   # Configuración API
│   ├── App.jsx                      # Componente principal
│   ├── main.jsx                     # Punto de entrada React
│   └── index.css                    # Estilos globales
│
├── public/                          # Archivos públicos estáticos
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── build/                           # Build de producción (generado)
│
├── package.json                     # Dependencias frontend
├── README.md                        # Documentación principal
├── DEPLOYMENT.md                    # Guía de despliegue
├── DEPLOYMENT_URLS.md               # URLs de producción
├── DOCUMENTACION_MODULOS.md         # Este documento
├── DOCUMENTACION_PRUEBAS.md         # Documentación de pruebas
└── MANUAL_TECNICO.md                # Manual técnico
```

### 3.2 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| `backend/server.js` | Punto de entrada del backend, configura Express |
| `backend/config/database.js` | Pool de conexiones MySQL |
| `backend/models/User.js` | Operaciones CRUD de usuarios |
| `src/App.jsx` | Configuración de rutas y layout principal |
| `src/config/api.js` | Base URL del API centralizada |
| `src/hooks/useSessionTimeout.js` | Lógica de timeout de sesión |

---

## 4. Tecnologías Utilizadas

### 4.1 Frontend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| React | 19.2.0 | Framework UI |
| React Router DOM | 7.10.1 | Navegación SPA |
| Axios | 1.7.9 | Cliente HTTP |
| CSS3 | - | Estilos |

**Dependencias de Desarrollo:**
```json
{
  "@testing-library/react": "^16.0.2",
  "@testing-library/jest-dom": "^5.17.0",
  "react-scripts": "5.0.1"
}
```

### 4.2 Backend

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| Node.js | 18.x | Runtime JavaScript |
| Express | 5.2.1 | Framework web |
| MySQL2 | 3.12.2 | Driver MySQL |
| bcryptjs | 3.0.3 | Hash de contraseñas |
| jsonwebtoken | 9.0.3 | Autenticación JWT |
| cors | 3.0.0 | Manejo CORS |
| nodemailer | 7.0.11 | Envío de emails |
| dotenv | 16.5.0 | Variables de entorno |

### 4.3 Base de Datos

| Componente | Detalle |
|------------|---------|
| Motor | MySQL 8.0 |
| Charset | utf8mb4 |
| Collation | utf8mb4_unicode_ci |
| Storage Engine | InnoDB |
| Transacciones | Soportadas |

---

## 5. Base de Datos

### 5.1 Diagrama Entidad-Relación

```
┌──────────────────────────────────────────────────────────┐
│                      USUARIOS                             │
├──────────────────────────────────────────────────────────┤
│ PK  email                    VARCHAR(150)                 │
│     nombre_usuario           VARCHAR(100)  UNIQUE         │
│     tipo_identificacion      VARCHAR(5)                   │
│     identificacion           VARCHAR(50)   UNIQUE         │
│     fecha_nacimiento         DATE                         │
│     telefono                 VARCHAR(20)                  │
│     direccion                VARCHAR(255)                 │
│     tipo_usuario             VARCHAR(50)   DEFAULT Cliente│
│     formacion_profesional    VARCHAR(255)  NULL           │
│     tarjeta_profesional      VARCHAR(100)  NULL           │
│     password                 VARCHAR(255)                 │
│     verificado               BOOLEAN       DEFAULT FALSE  │
│     token_verificacion       VARCHAR(255)  NULL           │
│     token_recuperacion       VARCHAR(255)  NULL           │
│     token_recuperacion_expira DATETIME     NULL           │
│     fecha_registro           TIMESTAMP     AUTO           │
│     ultimo_acceso            TIMESTAMP     NULL           │
└──────────────────────────────────────────────────────────┘
```

### 5.2 Script de Creación

```sql
CREATE DATABASE IF NOT EXISTS seguramente_db 
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE seguramente_db;

CREATE TABLE usuarios (
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
    token_recuperacion VARCHAR(255) DEFAULT NULL,
    token_recuperacion_expira DATETIME DEFAULT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL
);

-- Índices para optimización
CREATE INDEX idx_nombre_usuario ON usuarios(nombre_usuario);
CREATE INDEX idx_identificacion ON usuarios(identificacion);
CREATE INDEX idx_token_verificacion ON usuarios(token_verificacion);
CREATE INDEX idx_token_recuperacion ON usuarios(token_recuperacion);
CREATE INDEX idx_fecha_registro ON usuarios(fecha_registro);
```

### 5.3 Migraciones

**Migración 1: Campos de Empleado**
```sql
-- backend/migrations/add_employee_fields.sql
ALTER TABLE usuarios 
ADD COLUMN tipo_usuario VARCHAR(50) DEFAULT 'Cliente' AFTER direccion;

ALTER TABLE usuarios 
ADD COLUMN formacion_profesional VARCHAR(255) AFTER tipo_usuario;

ALTER TABLE usuarios 
ADD COLUMN tarjeta_profesional VARCHAR(100) AFTER formacion_profesional;
```

**Migración 2: Password Reset**
```sql
-- backend/migrations/add_password_reset_fields.sql
ALTER TABLE usuarios 
ADD COLUMN token_recuperacion VARCHAR(255) DEFAULT NULL AFTER token_verificacion;

ALTER TABLE usuarios 
ADD COLUMN token_recuperacion_expira DATETIME DEFAULT NULL AFTER token_recuperacion;

CREATE INDEX idx_token_recuperacion ON usuarios(token_recuperacion);
```

### 5.4 Consultas Comunes

**Crear Usuario:**
```sql
INSERT INTO usuarios (
    email, nombre_usuario, tipo_identificacion, identificacion,
    fecha_nacimiento, telefono, direccion, password, 
    token_verificacion, verificado
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
```

**Listar Usuarios:**
```sql
SELECT email, nombre_usuario, tipo_identificacion, identificacion,
       fecha_nacimiento, telefono, direccion, tipo_usuario,
       formacion_profesional, tarjeta_profesional,
       verificado, fecha_registro, ultimo_acceso
FROM usuarios
ORDER BY fecha_registro DESC;
```

**Actualizar Usuario:**
```sql
UPDATE usuarios 
SET nombre_usuario = ?,
    tipo_identificacion = ?,
    identificacion = ?,
    fecha_nacimiento = ?,
    telefono = ?,
    direccion = ?,
    tipo_usuario = ?,
    formacion_profesional = ?,
    tarjeta_profesional = ?
WHERE email = ?;
```

**Eliminar Usuario:**
```sql
DELETE FROM usuarios WHERE email = ?;
```

---

## 6. API REST - Endpoints

### 6.1 Autenticación

#### POST /api/auth/register

**Descripción:** Registrar nuevo usuario

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "nombreUsuario": "Juan Pérez",
  "tipoIdentificacion": "CC",
  "identificacion": "1234567890",
  "fechaNacimiento": "1990-01-15",
  "telefono": "3001234567",
  "direccion": "Calle 123 #45-67",
  "email": "juan@example.com",
  "password": "Password123!"
}
```

**Response 201:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "email": "juan@example.com",
    "nombreUsuario": "Juan Pérez"
  }
}
```

---

#### POST /api/auth/login

**Descripción:** Iniciar sesión

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "juan@example.com",
  "password": "Password123!"
}
```

**Response 200:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "juan@example.com",
    "nombreUsuario": "Juan Pérez",
    "verificado": true
  }
}
```

---

#### GET /api/auth/verify-email?token=xxx

**Descripción:** Verificar email del usuario

**Response 200:**
```json
{
  "success": true,
  "message": "Email verificado exitosamente"
}
```

---

### 6.2 Gestión de Usuarios

#### GET /api/users

**Descripción:** Obtener todos los usuarios

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "users": [
    {
      "email": "juan@example.com",
      "nombre_usuario": "Juan Pérez",
      "tipo_identificacion": "CC",
      "identificacion": "1234567890",
      "fecha_nacimiento": "1990-01-15",
      "telefono": "3001234567",
      "direccion": "Calle 123 #45-67",
      "tipo_usuario": "Cliente",
      "verificado": true,
      "fecha_registro": "2026-01-12T00:00:00.000Z",
      "ultimo_acceso": "2026-01-12T10:30:00.000Z"
    }
  ]
}
```

---

#### POST /api/users

**Descripción:** Crear usuario desde dashboard

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:**
```json
{
  "nombre_usuario": "María González",
  "tipo_identificacion": "CC",
  "identificacion": "9876543210",
  "fecha_nacimiento": "1985-05-20",
  "telefono": "3109876543",
  "direccion": "Carrera 45 #67-89",
  "tipo_usuario": "Empleado",
  "formacion_profesional": "Psicología - Universidad Nacional",
  "tarjeta_profesional": "TP-12345",
  "email": "maria@example.com",
  "password": "Secure123!"
}
```

---

#### PUT /api/users/:email

**Descripción:** Actualizar usuario existente

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Body:** (campos a actualizar)
```json
{
  "telefono": "3001111111",
  "direccion": "Nueva dirección 456"
}
```

---

#### DELETE /api/users/:email

**Descripción:** Eliminar usuario

**Headers:**
```
Authorization: Bearer <token>
```

**Response 200:**
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

---

## 7. Autenticación y Seguridad

### 7.1 Flujo de Autenticación JWT

```
1. Usuario envía credenciales (email + password)
   ↓
2. Backend verifica en base de datos
   ↓
3. bcrypt.compare(password, hashedPassword)
   ↓
4. Si es válido: jwt.sign({ email }, SECRET, { expiresIn: '7d' })
   ↓
5. Token enviado al frontend
   ↓
6. Frontend almacena token en localStorage
   ↓
7. Todas las peticiones subsecuentes incluyen:
   Header: Authorization: Bearer <token>
   ↓
8. Backend verifica token en cada petición protegida
```

### 7.2 Hash de Contraseñas

**Algoritmo:** bcrypt con 10 rounds de salt

```javascript
// Al registrar
const hashedPassword = await bcrypt.hash(password, 10);

// Al login
const isValid = await bcrypt.compare(inputPassword, storedHash);
```

### 7.3 Middleware de Autenticación

**Archivo:** Implementado inline en `backend/routes/users.js`

```javascript
const jwt = require('jsonwebtoken');

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      success: false, 
      message: 'No autorizado' 
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ 
        success: false, 
        message: 'Token inválido' 
      });
    }
    req.user = user;
    next();
  });
};
```

### 7.4 CORS Configuration

```javascript
// backend/server.js
const cors = require('cors');

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### 7.5 Variables de Entorno Sensibles

**NUNCA commitear al repositorio:**
- JWT_SECRET
- DB_PASSWORD
- EMAIL_PASS

**Uso de .env:**
```javascript
require('dotenv').config();

const secret = process.env.JWT_SECRET;
```

---

## 8. Deployment

### 8.1 Despliegue Frontend (Vercel)

**Pasos:**

1. **Conectar Repositorio GitHub**
   - Ir a https://vercel.com
   - "Add New Project"
   - Importar repositorio GitHub

2. **Configurar Build**
   ```
   Framework Preset: Create React App
   Build Command: npm run build
   Output Directory: build
   Install Command: npm install
   ```

3. **Variables de Entorno**
   ```
   REACT_APP_API_URL=https://[tu-backend].onrender.com/api
   ```

4. **Deploy**
   - Vercel auto-deploya desde el branch `main`
   - URL generada: https://[proyecto].vercel.app

---

### 8.2 Despliegue Backend (Render)

**Pasos:**

1. **Crear Web Service**
   - Ir a https://render.com
   - "New Web Service"
   - Conectar GitHub repo

2. **Configurar Service**
   ```
   Name: segura-mente-app-backend
   Region: Oregon (US West)
   Branch: main
   Root Directory: backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   ```

3. **Variables de Entorno** (todas las del .env)
   ```
   NODE_ENV=production
   PORT=10000
   DB_HOST=caboose.proxy.rlwy.net
   DB_PORT=43186
   DB_USER=root
   DB_PASSWORD=[tu_password]
   DB_NAME=railway
   DB_SSL=true
   JWT_SECRET=[tu_secret]
   JWT_EXPIRE=7d
   CLIENT_URL=https://[tu-frontend].vercel.app
   ```

4. **Deploy**
   - Render auto-deploya desde `main`
   - Health check en ruta `/`

---

### 8.3 Despliegue Base de Datos (Railway)

**Pasos:**

1. **Crear MySQL Database**
   - Ir a https://railway.app
   - "New Project" → "Provision MySQL"

2. **Habilitar Public Networking**
   - Settings → Networking
   - Enable "Public Networking"
   - Anotar host público y puerto

3. **Ejecutar Scripts**
   - Conectar con cliente MySQL:
   ```bash
   mysql -h caboose.proxy.rlwy.net -P 43186 -u root -p
   ```
   - Ejecutar `database.sql`
   - Ejecutar migraciones

4. **SSL Requerido**
   - Railway requiere conexiones SSL
   - Configurar en backend: `DB_SSL=true`

---

## 9. Mantenimiento y Troubleshooting

### 9.1 Logs del Backend

**Render:**
- Dashboard → Tu servicio → "Logs"
- Logs en tiempo real
- Filtrar por nivel (info, error, warning)

**Logs importantes a monitorear:**
```javascript
console.log('MySQL conectado exitosamente');
console.log('Server running on port', PORT);
console.error('Error de conexión:', error);
```

### 9.2 Problemas Comunes

#### Error: "Connection timeout" en Railway

**Causa:** Backend usando host interno en lugar de público

**Solución:**
```env
# Usar host público
DB_HOST=caboose.proxy.rlwy.net
DB_PORT=43186
```

---

#### Error: "CORS policy blocked"

**Causa:** CLIENT_URL no configurado o incorrecto

**Solución:**
```env
# Asegurar que coincide exactamente
CLIENT_URL=https://segura-mente-app-frontend.vercel.app
```

---

#### Error: "JWT malformed"

**Causa:** Token no incluido o formato incorrecto

**Solución:**
```javascript
// Frontend debe enviar:
headers: {
  'Authorization': `Bearer ${token}`
}
```

---

#### Backend tarda mucho en responder (primera vez)

**Causa:** Cold start de Render free tier (15 min inactividad)

**Solución:**
- Esperar 30-60 segundos en primera carga
- Upgrade a plan paid (sin cold start)
- Implementar keep-alive ping

---

### 9.3 Monitoreo

**Uptime Monitoring:**
- Usar servicio como UptimeRobot
- Ping cada 5 minutos a: `https://[backend].onrender.com/`

**Performance:**
- Vercel Analytics (incluido gratis)
- Response time promedio < 3s

**Database:**
- Railway dashboard muestra:
  - Connections activas
  - CPU usage
  - Memory usage
  - Storage usado

---

### 9.4 Backups

**Base de Datos:**
```bash
# Exportar desde Railway
mysqldump -h caboose.proxy.rlwy.net -P 43186 -u root -p railway > backup_$(date +%Y%m%d).sql

# Importar
mysql -h caboose.proxy.rlwy.net -P 43186 -u root -p railway < backup_20260112.sql
```

**Código Fuente:**
- Automático en GitHub
- Tags para versiones importantes:
```bash
git tag -a v1.0.0 -m "Primera versión estable"
git push origin v1.0.0
```

---

## 10. Escalabilidad y Mejoras Futuras

### 10.1 Optimizaciones Recomendadas

**Backend:**
- [ ] Implementar rate limiting (express-rate-limit)
- [ ] Agregar logging profesional (Winston)
- [ ] Cachear queries frecuentes (Redis)
- [ ] Implementar paginación en el backend
- [ ] Agregar compresión gzip

**Frontend:**
- [ ] Implementar lazy loading de componentes
- [ ] Agregar PWA capabilities
- [ ] Optimizar imágenes (WebP)
- [ ] Implementar service workers

**Database:**
- [ ] Implementar réplicas de lectura
- [ ] Agregar índices compuestos
- [ ] Implementar soft deletes
- [ ] Particionamiento de tablas grandes

---

### 10.2 Funcionalidades Futuras

**Sistema de Roles:**
```sql
CREATE TABLE roles (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE usuario_roles (
    usuario_email VARCHAR(150),
    role_id INT,
    FOREIGN KEY (usuario_email) REFERENCES usuarios(email),
    FOREIGN KEY (role_id) REFERENCES roles(id),
    PRIMARY KEY (usuario_email, role_id)
);
```

**Auditoría:**
```sql
CREATE TABLE auditoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    usuario_email VARCHAR(150),
    accion VARCHAR(50),
    tabla VARCHAR(50),
    registro_id VARCHAR(150),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_email) REFERENCES usuarios(email)
);
```

**Notificaciones:**
- Implementar WebSockets (Socket.io)
- Notificaciones push
- Email transaccional via API (SendGrid API REST)

---

## 11. Comandos Útiles

### Git

```bash
# Ver estado
git status

# Agregar cambios
git add .

# Commit
git commit -m "Descripción"

# Push a GitHub (auto-deploy)
git push origin main

# Ver logs
git log --oneline --graph
```

### npm

```bash
# Instalar dependencias
npm install

# Actualizar paquete específico
npm update <paquete>

# Verificar vulnerabilidades
npm audit

# Corregir vulnerabilidades
npm audit fix

# Limpiar caché
npm cache clean --force
```

### MySQL

```bash
# Conectar a Railway
mysql -h caboose.proxy.rlwy.net -P 43186 -u root -p railway

# Ver tablas
SHOW TABLES;

# Describir tabla
DESCRIBE usuarios;

# Ver cantidad de usuarios
SELECT COUNT(*) FROM usuarios;

# Ver últimos usuarios registrados
SELECT nombre_usuario, email, fecha_registro 
FROM usuarios 
ORDER BY fecha_registro DESC 
LIMIT 10;
```

---

## 12. Contacto y Soporte

**Repositorio GitHub:**  
https://github.com/Juanflo112/segura-mente-app-GA8-220501096-AA1-EV02

**Issues:**  
https://github.com/Juanflo112/segura-mente-app-GA8-220501096-AA1-EV02/issues

**Documentación Adicional:**
- [README.md](README.md) - Introducción al proyecto
- [DEPLOYMENT.md](DEPLOYMENT.md) - Guía detallada de despliegue
- [DEPLOYMENT_URLS.md](DEPLOYMENT_URLS.md) - URLs de producción
- [DOCUMENTACION_MODULOS.md](DOCUMENTACION_MODULOS.md) - Documentación de módulos
- [DOCUMENTACION_PRUEBAS.md](DOCUMENTACION_PRUEBAS.md) - Documentación de pruebas

---

**Versión del Manual:** 1.0.0  
**Última Actualización:** Enero 12, 2026  
**Autor:** Juan Felipe
