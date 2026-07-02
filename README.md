# Segura-Mente App

**Evidencia:** GA8-220501096-AA1-EV02 - Modulos Integrados  
**Estudiante:** Juan Pablo Mejia Vargas  
**Version:** 1.0.0  
**Fecha:** 12/01/2026

---

## Descripcion de la Solucion

**Segura-Mente** es una aplicacion web de gestion de usuarios con autenticacion segura, desarrollada con React.js en el frontend y Node.js + Express + MySQL en el backend.

### Funcionalidades Principales

- Registro de usuarios con validaciones completas de campos
- Autenticacion con JWT y encriptacion de contrasenas con bcrypt
- Dashboard de administracion para gestion de usuarios y citas
- Control de sesion por inactividad con advertencia configurable
- API REST documentada con separacion MVC
- Interfaz responsiva y moderna

### Arquitectura del Sistema

La solucion sigue una arquitectura de tres capas distribuidas en la nube:

```
[Usuario Final (Navegador)]
          |  HTTPS
          v
[Frontend - React 18 / Vercel]
          |  REST API / HTTPS
          v
[Backend - Node.js + Express / Render]
          |  MySQL (SSL)
          v
[Base de Datos - MySQL 8.0 / Railway]
```

**Patron de diseno:** MVC Distribuido

| Capa | Tecnologia | Responsabilidad |
|------|-----------|-----------------|
| Vista | React.js, React Router | Presentacion e interaccion |
| Controlador | Express.js, JWT | Logica de negocio y autenticacion |
| Modelo | MySQL, mysql2 | Persistencia de datos |

### Stack Tecnologico

**Frontend**
- React 18
- React Router
- Axios
- CSS

**Backend**
- Node.js
- Express.js
- bcryptjs
- jsonwebtoken
- nodemailer
- express-validator

**Infraestructura**
- Vercel (frontend)
- Render.com (backend)
- Railway (base de datos MySQL)

### Estructura del Proyecto

```
segura-mente-app/
├── backend/               # Servidor Node.js + Express
│   ├── config/           # Configuracion de base de datos
│   ├── controllers/      # Logica de negocio
│   ├── middleware/       # Validaciones y middleware
│   ├── models/          # Modelos de datos
│   ├── routes/          # Rutas de la API
│   ├── utils/           # Utilidades (email, etc.)
│   ├── database.sql     # Script de base de datos
│   └── server.js        # Servidor principal
├── src/                 # Frontend React
│   ├── components/      # Componentes reutilizables
│   ├── pages/           # Paginas de la aplicacion
│   ├── hooks/           # Hooks personalizados
│   └── App.jsx          # Componente principal
└── public/              # Archivos publicos
```

### Modulo de Control de Sesion

El sistema detecta inactividad del usuario (mouse, teclado, scroll, touch) y ejecuta el siguiente flujo:

```
Minutos 0 a 14  -> Usuario activo, temporizador se reinicia con cada accion
Minuto 14       -> Aparece advertencia "Sesion por expirar"
Minuto 15       -> Cierre automatico de sesion
```

### Seguridad

- Contrasenas encriptadas con bcrypt
- Autenticacion basada en JWT
- CORS restringido al dominio del frontend
- Validacion de datos con express-validator
- Variables sensibles en .env (nunca en el repositorio)

### Base de Datos - Tabla Principal: usuarios

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| email | PRIMARY KEY | Identificador unico |
| nombre_usuario | UNIQUE | Nombre de usuario |
| identificacion | UNIQUE | Documento de identidad |
| password | VARCHAR | Contrasena encriptada |
| verificado | BOOLEAN | Estado de verificacion |
| token_verificacion | VARCHAR | Token de activacion |

### API Endpoints Principales

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | /api/auth/register | Registro de usuario |
| POST | /api/auth/login | Inicio de sesion |
| GET | /api/auth/verify | Verificacion de email |
| GET | /api/users | Listar usuarios |
| POST | /api/appointments | Crear cita |

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

---

## Proceso de Despliegue

### URLs de Produccion

| Componente | URL | Plataforma |
|-----------|-----|-----------|
| Frontend | https://segura-mente-app-final.vercel.app/ | Vercel |
| Backend | https://segura-mente-app-ga8-220501096-aa1-ev02.onrender.com | Render |
| Base de Datos | segura-mente-app-final-production.up.railway.app | Railway |

**Repositorio:** https://github.com/Juanflo112/Segura-Mente-App-Final.git

> **Nota de migracion:** El repositorio original `segura-mente-app-GA8-220501096-AA1-EV02` fue reemplazado por `Segura-Mente-App-Final` para incorporar mejoras en la funcionalidad orientadas al despliegue en produccion.

---

### Ejecucion Local

#### Requisitos Previos

- Node.js v18 o superior
- MySQL 8.0 o superior
- Git

#### 1. Clonar el Repositorio

```bash
git clone https://github.com/Juanflo112/Segura-Mente-App-Final.git
cd Segura-Mente-App-Final
```

#### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crear el archivo `backend/.env` con las siguientes variables:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=seguramente_db
JWT_SECRET=clave_secreta_muy_larga_y_aleatoria
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_contrasena_app_gmail
FRONTEND_URL=http://localhost:3000
```

#### 3. Configurar la Base de Datos

Ejecutar el script SQL en MySQL:

```bash
mysql -u root -p seguramente_db < backend/database.sql
```

#### 4. Configurar el Frontend

```bash
# En la raiz del proyecto
npm install
```

Crear el archivo `.env` en la raiz:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

#### 5. Iniciar la Aplicacion

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
npm start
```

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

### Despliegue en Produccion

#### Paso 1: Base de Datos en Railway

1. Crear cuenta en [railway.app](https://railway.app) con GitHub
2. Crear nuevo proyecto: "New Project" > "Provision MySQL"
3. Copiar las credenciales de conexion (host, user, password, database, port)
4. Ejecutar el script de base de datos:

```bash
mysql -h <MYSQL_HOST> -P <MYSQL_PORT> -u <MYSQL_USER> -p<MYSQL_PASSWORD> <MYSQL_DATABASE> < backend/database.sql
```

#### Paso 2: Backend en Render

1. Crear cuenta en [render.com](https://render.com) con GitHub
2. "New +" > "Web Service" > conectar el repositorio
3. Configurar el servicio:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

4. Agregar las siguientes variables de entorno en Render:

```
NODE_ENV=production
PORT=10000
DB_HOST=<host de Railway>
DB_USER=<usuario de Railway>
DB_PASSWORD=<contrasena de Railway>
DB_NAME=<nombre de BD Railway>
DB_PORT=<puerto de Railway>
JWT_SECRET=<generar con: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))">
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=<correo@gmail.com>
EMAIL_PASS=<contrasena de aplicacion Gmail>
EMAIL_FROM=<correo@gmail.com>
CLIENT_URL=<URL del frontend en Vercel>
```

5. Click en "Create Web Service" y esperar el despliegue (5-10 minutos)

**Nota sobre contrasenas de aplicacion Gmail:** Activar verificacion en dos pasos en la cuenta de Google, luego ir a Seguridad > Contrasenas de aplicaciones y generar una para la aplicacion.

#### Paso 3: Frontend en Vercel

1. Crear cuenta en [vercel.com](https://vercel.com) con GitHub
2. "Add New" > "Project" > importar el repositorio
3. Configurar:
   - **Framework Preset:** Create React App
   - **Root Directory:** `./`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`

4. Agregar variable de entorno:

```
REACT_APP_API_URL=https://<nombre-del-servicio>.onrender.com/api
```

5. Click en "Deploy"

#### Paso 4: Actualizar CORS

Una vez obtenida la URL del frontend de Vercel, actualizar en Render la variable:

```
CLIENT_URL=https://<tu-proyecto>.vercel.app
```

---

### Scripts de Comandos Utiles

```bash
# Construir el frontend para produccion
npm run build

# Generar JWT_SECRET seguro
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Verificar salud del backend
curl https://<backend>.onrender.com/api/health
```

---

### Checklist de Despliegue

- [ ] Base de datos MySQL creada y tablas migradas
- [ ] Backend desplegado en Render con todas las variables de entorno
- [ ] Frontend desplegado en Vercel
- [ ] Variable `REACT_APP_API_URL` configurada en Vercel apuntando al backend
- [ ] Variable `CLIENT_URL` configurada en Render apuntando al frontend
- [ ] Contrasena de aplicacion de Gmail configurada
- [ ] Prueba de registro y login funcionando correctamente
- [ ] Emails de verificacion recibidos

---

### Consideraciones del Plan Gratuito

| Servicio | Costo | Restriccion |
|----------|-------|-------------|
| Railway (MySQL) | Gratuito | 500 horas/mes |
| Render (Backend) | Gratuito | Duerme tras 15 min de inactividad (cold start 30-50 s) |
| Vercel (Frontend) | Gratuito | 100 GB bandwidth/mes |

---

### Solucion de Problemas Comunes

**Error: CORS blocked**
Verificar que `CLIENT_URL` en el backend coincida exactamente con la URL de Vercel.

**Error: Cannot connect to database**
Verificar las credenciales de MySQL en Render y que la instancia de Railway este activa.

**Backend muy lento en la primera solicitud**
Comportamiento normal en el plan gratuito de Render. El servicio se "duerme" tras 15 minutos de inactividad.

**Emails no llegan**
Verificar que `EMAIL_PASS` sea una contrasena de aplicacion de Gmail y no la contrasena de la cuenta.

---

## Derechos de Autor

**Proyecto:** Segura-Mente - Sistema de Gestión de Usuarios  
**Autor:** Juan Pablo Mejia Vargas  
**Programa:** Tecnologia en Analisis y Desarrollo de Sistemas de Informacion (ADSI)  
**Institucion:** SENA - Servicio Nacional de Aprendizaje  
**Evidencia:** GA8-220501096-AA1-EV02 - Modulos Integrados  
**Año:** 2026

### Licencia

Este proyecto fue desarrollado con fines academicos en el marco del programa de formacion del SENA. El codigo fuente es de autoria original del estudiante y puede ser consultado como evidencia de aprendizaje.

Queda prohibida la reproduccion total o parcial del presente trabajo con fines comerciales sin la autorizacion expresa del autor.

### Tecnologias de Terceros

Este proyecto hace uso de librerias y frameworks de codigo abierto. Sus respectivas licencias se encuentran en los archivos `package.json` de cada modulo del proyecto:

- React (MIT License) - Meta Platforms, Inc.
- Express.js (MIT License) - TJ Holowaychuk
- MySQL2 (MIT License) - Sidorenko Dmytro
- bcryptjs (MIT License) - Tobias Rodaebel
- jsonwebtoken (MIT License) - Auth0
- nodemailer (MIT License) - Andris Reinman







