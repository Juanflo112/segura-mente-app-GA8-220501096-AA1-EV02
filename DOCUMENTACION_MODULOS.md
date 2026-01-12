# Documentación de Módulos y Componentes - Segura Mente App

## 📋 Índice

1. [Módulo de Autenticación](#módulo-de-autenticación)
2. [Módulo de Gestión de Usuarios](#módulo-de-gestión-de-usuarios)
3. [Módulo de Control de Sesión](#módulo-de-control-de-sesión)
4. [Componentes del Frontend](#componentes-del-frontend)
5. [Modelos de Base de Datos](#modelos-de-base-de-datos)

---

## 1. Módulo de Autenticación

### 1.1 Registro de Usuario

**Archivo:** `backend/controllers/authController.js` - `register()`

#### Datos de Entrada
```json
{
  "nombreUsuario": "string (requerido, único)",
  "tipoIdentificacion": "string (requerido, valores: CC, TI, CE, PA)",
  "identificacion": "string (requerido, único)",
  "fechaNacimiento": "date (requerido, formato: YYYY-MM-DD)",
  "telefono": "string (requerido)",
  "direccion": "string (requerido)",
  "email": "string (requerido, único, formato email)",
  "password": "string (requerido, mín 8 caracteres)"
}
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente. Ya puedes iniciar sesión.",
  "data": {
    "email": "usuario@example.com",
    "nombreUsuario": "Usuario Ejemplo"
  }
}
```

#### Datos de Salida (Error)
```json
{
  "success": false,
  "message": "El correo electrónico ya está registrado"
}
```

#### Proceso Interno
1. Validación de datos de entrada
2. Verificación de duplicados (email, username, identificación)
3. Encriptación de contraseña con bcrypt
4. Generación de token de verificación
5. Inserción en base de datos
6. Auto-verificación del usuario (workaround para SMTP)

---

### 1.2 Inicio de Sesión

**Archivo:** `backend/controllers/authController.js` - `login()`

#### Datos de Entrada
```json
{
  "email": "string (requerido)",
  "password": "string (requerido)"
}
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "usuario@example.com",
    "nombreUsuario": "Usuario Ejemplo",
    "verificado": true
  }
}
```

#### Datos de Salida (Error - Usuario no verificado)
```json
{
  "success": false,
  "message": "Por favor verifica tu correo electrónico antes de iniciar sesión",
  "emailNotVerified": true
}
```

#### Proceso Interno
1. Búsqueda de usuario por email
2. Verificación de existencia del usuario
3. Comparación de contraseña con bcrypt
4. Verificación del estado de verificación
5. Generación de JWT token
6. Actualización de último acceso

---

### 1.3 Verificación de Email

**Archivo:** `backend/controllers/authController.js` - `verifyEmail()`

#### Datos de Entrada
```
Query Parameter: token=<token_de_verificacion>
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Email verificado exitosamente. Ya puedes iniciar sesión."
}
```

#### Proceso Interno
1. Recepción del token de verificación
2. Búsqueda de usuario por token
3. Actualización del campo `verificado` a TRUE
4. Eliminación del token de verificación

---

## 2. Módulo de Gestión de Usuarios

### 2.1 Listar Usuarios

**Archivo:** `backend/controllers/userController.js` - `getAllUsers()`

#### Datos de Entrada
```
Headers: Authorization: Bearer <token>
```

#### Datos de Salida
```json
{
  "success": true,
  "users": [
    {
      "email": "usuario@example.com",
      "nombre_usuario": "Usuario Ejemplo",
      "tipo_identificacion": "CC",
      "identificacion": "1234567890",
      "fecha_nacimiento": "1990-01-01",
      "telefono": "3001234567",
      "direccion": "Calle 123 #45-67",
      "tipo_usuario": "Cliente",
      "formacion_profesional": null,
      "tarjeta_profesional": null,
      "verificado": true,
      "fecha_registro": "2026-01-12T00:00:00.000Z",
      "ultimo_acceso": "2026-01-12T10:30:00.000Z"
    }
  ]
}
```

#### Proceso Interno
1. Verificación de autenticación mediante JWT
2. Consulta a la base de datos
3. Ordenamiento por fecha de registro descendente
4. Retorno de lista completa de usuarios

---

### 2.2 Crear Usuario (desde Dashboard)

**Archivo:** `backend/controllers/userController.js` - `createUser()`

#### Datos de Entrada
```json
{
  "nombre_usuario": "string (requerido)",
  "tipo_identificacion": "string (requerido)",
  "identificacion": "string (requerido)",
  "fecha_nacimiento": "date (requerido)",
  "telefono": "string (requerido)",
  "direccion": "string (requerido)",
  "tipo_usuario": "string (Cliente | Empleado)",
  "formacion_profesional": "string (opcional, requerido si tipo_usuario=Empleado)",
  "tarjeta_profesional": "string (opcional, requerido si tipo_usuario=Empleado)",
  "email": "string (requerido)",
  "password": "string (requerido)"
}
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "email": "nuevo@example.com"
  }
}
```

---

### 2.3 Actualizar Usuario

**Archivo:** `backend/controllers/userController.js` - `updateUser()`

#### Datos de Entrada
```json
{
  "nombre_usuario": "string",
  "tipo_identificacion": "string",
  "identificacion": "string",
  "fecha_nacimiento": "date",
  "telefono": "string",
  "direccion": "string",
  "tipo_usuario": "string",
  "formacion_profesional": "string",
  "tarjeta_profesional": "string"
}
```

#### URL Parameter
```
/api/users/:email
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Usuario actualizado exitosamente"
}
```

---

### 2.4 Eliminar Usuario

**Archivo:** `backend/controllers/userController.js` - `deleteUser()`

#### Datos de Entrada
```
URL Parameter: /api/users/:email
Headers: Authorization: Bearer <token>
```

#### Datos de Salida (Éxito)
```json
{
  "success": true,
  "message": "Usuario eliminado exitosamente"
}
```

---

## 3. Módulo de Control de Sesión

### 3.1 Hook useSessionTimeout

**Archivo:** `src/hooks/useSessionTimeout.js`

#### Parámetros de Entrada
```javascript
useSessionTimeout(timeoutMinutes = 5, warningMinutes = 1)
```

#### Datos de Salida
```javascript
{
  showWarning: boolean,      // Mostrar advertencia de cierre inminente
  remainingTime: number,     // Segundos restantes
  resetTimer: function       // Función para reiniciar el temporizador
}
```

#### Funcionalidad
- Detecta inactividad del usuario
- Muestra advertencia 1 minuto antes de cerrar sesión
- Cierra sesión automáticamente después de 5 minutos de inactividad
- Monitorea eventos: mousedown, mousemove, keypress, scroll, touchstart, click

---

## 4. Componentes del Frontend

### 4.1 LoginForm

**Archivo:** `src/components/Login/LoginForm.jsx`

#### Props
Ninguno (componente independiente)

#### Estado Interno
```javascript
{
  email: string,
  password: string,
  showPassword: boolean,
  rememberMe: boolean,
  isLoading: boolean
}
```

#### Eventos
- `handleSubmit`: Procesa el inicio de sesión
- `handlePasswordToggle`: Muestra/oculta contraseña

---

### 4.2 RegisterForm

**Archivo:** `src/components/Register/RegisterForm.jsx`

#### Estado Interno
```javascript
{
  nombreUsuario: string,
  tipoIdentificacion: string,
  identificacion: string,
  fechaNacimiento: string,
  telefono: string,
  direccion: string,
  email: string,
  password: string,
  confirmPassword: string,
  showPassword: boolean,
  showConfirmPassword: boolean
}
```

#### Validaciones
- Contraseñas coinciden
- Formato de email válido
- Campos obligatorios completos

---

### 4.3 UserList

**Archivo:** `src/components/Dashboard/UserList.jsx`

#### Props
```javascript
{
  onEditUser: function,  // Callback para editar usuario
  onBack: function       // Callback para volver atrás
}
```

#### Estado Interno
```javascript
{
  users: array,
  loading: boolean,
  error: string,
  selectedUsers: array,
  selectAll: boolean,
  currentPage: number
}
```

#### Funcionalidades
- Paginación (5 usuarios por página)
- Selección múltiple de usuarios
- Edición individual
- Eliminación individual o múltiple
- Actualización de lista

---

### 4.4 UserEditForm

**Archivo:** `src/components/Dashboard/UserEditForm.jsx`

#### Props
```javascript
{
  user: object,      // Usuario a editar
  onSave: function,  // Callback al guardar
  onCancel: function // Callback al cancelar
}
```

#### Proceso
1. Carga datos del usuario en el formulario
2. Permite edición de campos
3. Valida datos antes de enviar
4. Actualiza usuario en backend
5. Notifica resultado

---

### 4.5 UserRegisterForm

**Archivo:** `src/components/Dashboard/UserRegisterForm.jsx`

#### Props
```javascript
{
  onSave: function,   // Callback al guardar
  onCancel: function  // Callback al cancelar
}
```

#### Validaciones Especiales
- Contraseña mínimo 8 caracteres
- Al menos una mayúscula
- Al menos un número
- Al menos un símbolo especial
- Campos de empleado obligatorios si tipo_usuario = "Empleado"

---

## 5. Modelos de Base de Datos

### 5.1 Tabla: usuarios

**Archivo:** `backend/database.sql`

#### Estructura
```sql
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
```

#### Índices
```sql
CREATE INDEX idx_nombre_usuario ON usuarios(nombre_usuario);
CREATE INDEX idx_identificacion ON usuarios(identificacion);
CREATE INDEX idx_token_verificacion ON usuarios(token_verificacion);
CREATE INDEX idx_token_recuperacion ON usuarios(token_recuperacion);
```

#### Constraints
- **PRIMARY KEY:** email
- **UNIQUE:** nombre_usuario, identificacion
- **NOT NULL:** email, nombre_usuario, tipo_identificacion, identificacion, fecha_nacimiento, telefono, direccion, password

---

## 6. Middleware y Utilidades

### 6.1 Validación de Datos

**Archivo:** `backend/middleware/validation.js`

#### Función: validateRegister

**Validaciones:**
- Email válido y requerido
- Password mínimo 6 caracteres
- Nombre de usuario requerido
- Identificación requerida
- Fecha de nacimiento requerida
- Teléfono requerido
- Dirección requerida

### 6.2 Utilidades de Email

**Archivo:** `backend/utils/email.js`

#### Funciones Disponibles
- `sendVerificationEmail()`: Envío de email de verificación
- `sendWelcomeEmail()`: Email de bienvenida
- `sendPasswordResetEmail()`: Email de recuperación de contraseña

**Nota:** Actualmente deshabilitadas debido a limitaciones de SMTP en hosting gratuito.

---

## 7. Configuración y Variables de Entorno

### Backend (.env)
```env
NODE_ENV=production
PORT=10000
DB_HOST=caboose.proxy.rlwy.net
DB_PORT=43186
DB_USER=root
DB_PASSWORD=[cifrado]
DB_NAME=railway
DB_SSL=true
JWT_SECRET=[cifrado]
JWT_EXPIRE=7d
CLIENT_URL=https://segura-mente-app-frontend.vercel.app
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=[API_KEY]
EMAIL_FROM=[email]
```

### Frontend (.env.production)
```env
REACT_APP_API_URL=https://segura-mente-app-ga8-220501096-aa1-ev02.onrender.com/api
```

---

## 8. Flujos de Datos Completos

### Flujo de Registro
```
Usuario → RegisterForm → API /auth/register → authController.register() 
→ User.create() → Base de Datos → User.verifyByEmail() 
→ Respuesta → SuccessPage → Login
```

### Flujo de Login
```
Usuario → LoginForm → API /auth/login → authController.login() 
→ User.findByEmail() → bcrypt.compare() → jwt.sign() 
→ localStorage → Redirección a Dashboard
```

### Flujo de Gestión de Usuarios
```
Dashboard → UserList → API /users → userController.getAllUsers() 
→ User.findAll() → Base de Datos → Renderizado de Lista
```

---

## 📝 Notas de Implementación

1. **Seguridad:** Las contraseñas se encriptan con bcrypt (10 rounds)
2. **Autenticación:** JWT con expiración de 7 días
3. **CORS:** Configurado para aceptar solo el dominio del frontend
4. **Paginación:** Implementada en el frontend (5 registros por página)
5. **Validación:** Doble validación (frontend y backend)
6. **Manejo de Errores:** Respuestas consistentes con formato `{success, message, data/error}`
