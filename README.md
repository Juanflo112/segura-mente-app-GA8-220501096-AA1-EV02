# Segura-Mente App

Aplicación web para la gestión segura de usuarios, desarrollada con React.js en el frontend y Node.js + Express + MySQL en el backend.

## Descripción del Proyecto

**Segura-Mente** es una plataforma de registro y autenticación de usuarios con verificación de email. El proyecto incluye:

- Sistema de registro con validaciones completas
- Verificación de correo electrónico
- Dashboard de administración de usuarios
- Interfaz moderna y responsiva
- Backend REST API con Node.js y Express
- Base de datos MySQL
- Encriptación de contraseñas
- Envío de correos electrónicos

## Estructura del Proyecto

```
segura-mente-app/
├── backend/               # Servidor Node.js + Express
│   ├── config/           # Configuración de base de datos
│   ├── controllers/      # Lógica de negocio
│   ├── middleware/       # Validaciones y middleware
│   ├── models/          # Modelos de datos
│   ├── routes/          # Rutas de la API
│   ├── utils/           # Utilidades (email, etc.)
│   ├── .env             # Variables de entorno
│   ├── database.sql     # Script de base de datos
│   └── server.js        # Servidor principal
│
├── src/                 # Frontend React
│   ├── components/      # Componentes reutilizables
│   │   ├── Dashboard/   # Componentes del dashboard
│   │   ├── Login/       # Componentes de login
│   │   ├── Logo/        # Logo de la aplicación
│   │   └── Register/    # Componentes de registro
│   ├── pages/           # Páginas de la aplicación
│   ├── assets/          # Imágenes e iconos
│   └── App.jsx          # Componente principal
│
└── public/              # Archivos públicos
```

## Instalación y Configuración

### Requisitos Previos

- Node.js (v14 o superior)
- XAMPP (para MySQL y phpMyAdmin)
- Git
- Editor de código (VS Code recomendado)

### 1️ Clonar el Repositorio

```bash
git clone https://github.com/Juanflo112/GA7-220501096-AA5-EV03-Dise-o-y-desarrollo-de-servicios-web----Proyecto.git
cd segura-mente-app
```

### 2️ Configurar el Frontend

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm start
```

La aplicación se abrirá en [http://localhost:3000](http://localhost:3000)

### 3️ Configurar el Backend

```bash
# Navegar a la carpeta backend
cd backend

# Instalar dependencias
npm install
```

### 4️ Configurar la Base de Datos

1. **Inicia XAMPP** y activa MySQL
2. **Abre phpMyAdmin**: `http://localhost/phpmyadmin`
3. **Ejecuta el script SQL** que está en `backend/database.sql`

### 5️ Configurar Variables de Entorno

Edita el archivo `backend/.env` con tus credenciales:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=seguramente_db
JWT_SECRET=tu_clave_secreta_muy_segura
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contraseña_app_gmail
FRONTEND_URL=http://localhost:3000
```

** Importante:** Para enviar emails, necesitas una "Contraseña de aplicación" de Gmail. Ver instrucciones en `backend/README.md`

### 6️ Iniciar el Backend

```bash
# Desde la carpeta backend
npm start
```

El servidor se ejecutará en [http://localhost:5000](http://localhost:5000)

## Uso de la Aplicación

### Registro de Usuario

1. Navega a la página de registro
2. Completa el formulario con:
   - Nombre de usuario
   - Documento de identificación
   - Fecha de nacimiento
   - Teléfono
   - Dirección
   - Correo electrónico
   - Contraseña (mínimo 8 caracteres, con mayúsculas, minúsculas, números y símbolos)
3. Haz clic en "Crear cuenta"
4. Verifica tu correo electrónico
5. Haz clic en el enlace de verificación
6. ¡Cuenta activada!

### Login

1. Ingresa tu correo y contraseña
2. Accede al dashboard

##  Scripts Disponibles

### Frontend

```bash
npm start          # Inicia el servidor de desarrollo
npm test           # Ejecuta las pruebas
npm run build      # Construye la aplicación para producción
npm run eject      # Expone la configuración (irreversible)
```

### Backend

```bash
npm start          # Inicia el servidor backend
npm run dev        # Inicia con nodemon (recarga automática)
```

## Seguridad

- Contraseñas encriptadas con bcrypt
- Validación de datos con express-validator
- CORS configurado
- Variables sensibles en .env
- Email como PRIMARY KEY
- Tokens únicos de verificación

## Base de Datos

La aplicación utiliza MySQL con la siguiente estructura principal:

### Tabla: usuarios
- **email** (PRIMARY KEY) - Identificador único
- **nombre_usuario** (UNIQUE) - Nombre de usuario único
- **identificacion** (UNIQUE) - Documento único
- **password** - Contraseña encriptada
- **verificado** - Estado de verificación
- **token_verificacion** - Token de verificación


Ver `backend/database.sql` para la estructura completa.

## API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `GET /api/auth/verify?token=...` - Verificar email
- `POST /api/auth/resend-verification` - Reenviar email

Ver `backend/README.md` para documentación completa de la API.

## Tecnologías Utilizadas

### Frontend
- React.js
- React Router
- CSS3

### Backend
- Node.js
- Express.js
- MySQL (mysql2)
- bcryptjs (encriptación)
- jsonwebtoken (JWT)
- nodemailer (envío de emails)
- express-validator (validaciones)

## Documentación Adicional

- [Documentación del Backend](backend/README.md)
- [Documentación de Create React App](https://facebook.github.io/create-react-app/docs/getting-started)
- [Documentación de React](https://reactjs.org/)

##  Solución de Problemas

### Error de conexión a la base de datos
- Verifica que XAMPP esté ejecutándose
- Verifica las credenciales en `backend/.env`
- Asegúrate de haber ejecutado `database.sql`

### Error al enviar emails
- Usa una "Contraseña de aplicación" de Gmail
- Activa la verificación en 2 pasos en tu cuenta de Google

### Puerto en uso
- Verifica que ningún otro proceso esté usando el puerto 3000 o 5000
- Cambia el puerto en las variables de entorno si es necesario







