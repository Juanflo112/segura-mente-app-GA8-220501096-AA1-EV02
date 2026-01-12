# Documentación de Pruebas - Segura Mente App

## 📋 Índice

1. [Pruebas de Módulo de Autenticación](#pruebas-de-módulo-de-autenticación)
2. [Pruebas de Módulo de Gestión de Usuarios](#pruebas-de-módulo-de-gestión-de-usuarios)
3. [Pruebas de Control de Sesión](#pruebas-de-control-de-sesión)
4. [Pruebas de Base de Datos](#pruebas-de-base-de-datos)
5. [Pruebas de Integración](#pruebas-de-integración)
6. [Configuración de Ambientes](#configuración-de-ambientes)

---

## 1. Pruebas de Módulo de Autenticación

### Prueba 1.1: Registro de Usuario Exitoso

**Objetivo:** Verificar que un usuario puede registrarse correctamente

**Ambiente:** Producción (Vercel + Render)

**Datos de Entrada:**
```json
{
  "nombreUsuario": "Juan Pérez",
  "tipoIdentificacion": "CC",
  "identificacion": "1234567890",
  "fechaNacimiento": "1990-01-15",
  "telefono": "3001234567",
  "direccion": "Calle 123 #45-67",
  "email": "juan.perez@example.com",
  "password": "Password123!"
}
```

**Pasos:**
1. Acceder a https://segura-mente-app-frontend.vercel.app/
2. Hacer clic en "Registrarse"
3. Llenar el formulario con los datos de prueba
4. Hacer clic en "Registrarse"

**Resultado Esperado:**
- ✅ Usuario creado en base de datos
- ✅ Campo `verificado` = TRUE (auto-verificación activa)
- ✅ Redirección a página de éxito
- ✅ Mensaje: "¡Registro exitoso! Ahora puedes iniciar sesión"

**Resultado Obtenido:**
- ✅ **EXITOSO** - Usuario registrado correctamente
- ✅ Tiempo de respuesta: ~2.3 segundos
- ✅ Usuario auto-verificado
- ✅ Redirección correcta

**Evidencia:** Registro exitoso verificado en Railway MySQL

---

### Prueba 1.2: Registro con Email Duplicado

**Objetivo:** Verificar que el sistema rechaza emails duplicados

**Datos de Entrada:**
```json
{
  "email": "juan.perez@example.com",
  "... otros campos"
}
```

**Resultado Esperado:**
- ❌ Error: "El correo electrónico ya está registrado"
- ❌ HTTP Status: 400

**Resultado Obtenido:**
- ✅ **EXITOSO** - Sistema rechaza correctamente el email duplicado
- ✅ Mensaje de error apropiado mostrado al usuario

---

### Prueba 1.3: Login Exitoso

**Objetivo:** Verificar que un usuario verificado puede iniciar sesión

**Datos de Entrada:**
```json
{
  "email": "juan.perez@example.com",
  "password": "Password123!"
}
```

**Resultado Esperado:**
- ✅ Token JWT generado
- ✅ Redirección a Dashboard
- ✅ Token almacenado en localStorage

**Resultado Obtenido:**
- ✅ **EXITOSO** - Login completado
- ✅ Token generado correctamente
- ✅ Sesión iniciada
- ✅ Tiempo de respuesta: ~1.8 segundos

---

### Prueba 1.4: Login con Credenciales Incorrectas

**Objetivo:** Verificar el manejo de credenciales inválidas

**Datos de Entrada:**
```json
{
  "email": "juan.perez@example.com",
  "password": "ContraseñaIncorrecta"
}
```

**Resultado Esperado:**
- ❌ Error: "Credenciales inválidas"
- ❌ HTTP Status: 401
- ❌ No se genera token

**Resultado Obtenido:**
- ✅ **EXITOSO** - Sistema rechaza credenciales incorrectas
- ✅ Mensaje de error apropiado

---

## 2. Pruebas de Módulo de Gestión de Usuarios

### Prueba 2.1: Listar Todos los Usuarios

**Objetivo:** Verificar que se pueden listar todos los usuarios registrados

**Requisitos Previos:**
- Usuario autenticado

**Pasos:**
1. Iniciar sesión
2. Navegar al Dashboard
3. Hacer clic en "Gestionar Usuarios"

**Resultado Esperado:**
- ✅ Lista de usuarios cargada
- ✅ Datos completos de cada usuario
- ✅ Paginación funcionando

**Resultado Obtenido:**
- ✅ **EXITOSO** - Lista cargada correctamente
- ✅ Tiempo de respuesta: ~1.5 segundos
- ✅ Paginación operativa (5 usuarios por página)
- ✅ Todos los campos mostrados correctamente

---

### Prueba 2.2: Crear Usuario desde Dashboard

**Objetivo:** Verificar la creación de usuario tipo "Empleado" con campos adicionales

**Datos de Entrada:**
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
  "email": "maria.gonzalez@example.com",
  "password": "Secure123!"
}
```

**Resultado Esperado:**
- ✅ Usuario creado con tipo "Empleado"
- ✅ Campos de formación profesional guardados
- ✅ Usuario verificado automáticamente

**Resultado Obtenido:**
- ✅ **EXITOSO** - Empleado creado correctamente
- ✅ Campos adicionales almacenados
- ✅ Validaciones funcionando

---

### Prueba 2.3: Actualizar Usuario

**Objetivo:** Verificar la actualización de información de usuario

**Datos de Entrada:**
```json
{
  "telefono": "3001111111",
  "direccion": "Nueva Dirección 123"
}
```

**Resultado Esperado:**
- ✅ Campos actualizados en base de datos
- ✅ Mensaje de confirmación

**Resultado Obtenido:**
- ✅ **EXITOSO** - Usuario actualizado
- ✅ Cambios reflejados inmediatamente en la lista

---

### Prueba 2.4: Eliminar Usuario Individual

**Objetivo:** Verificar la eliminación de un usuario

**Pasos:**
1. Seleccionar usuario de la lista
2. Hacer clic en botón "Eliminar"
3. Confirmar eliminación

**Resultado Esperado:**
- ✅ Usuario eliminado de base de datos
- ✅ Usuario removido de la lista
- ✅ Mensaje de confirmación

**Resultado Obtenido:**
- ✅ **EXITOSO** - Usuario eliminado correctamente
- ✅ Lista actualizada automáticamente

---

### Prueba 2.5: Eliminación Múltiple

**Objetivo:** Verificar la eliminación de múltiples usuarios simultáneamente

**Pasos:**
1. Seleccionar 3 usuarios usando checkboxes
2. Hacer clic en "Eliminar Seleccionados"
3. Confirmar acción

**Resultado Esperado:**
- ✅ Todos los usuarios seleccionados eliminados
- ✅ Confirmación individual por usuario

**Resultado Obtenido:**
- ✅ **EXITOSO** - 3 usuarios eliminados correctamente
- ✅ Sin errores en el proceso

---

## 3. Pruebas de Control de Sesión

### Prueba 3.1: Timeout por Inactividad

**Objetivo:** Verificar que la sesión se cierra después de 5 minutos de inactividad

**Configuración:**
- Timeout: 5 minutos
- Advertencia: 1 minuto antes

**Pasos:**
1. Iniciar sesión
2. Dejar la aplicación sin interacción durante 5 minutos

**Resultado Esperado:**
- ⏰ A los 4 minutos: Advertencia de cierre inminente
- ⏰ A los 5 minutos: Cierre automático de sesión
- ✅ Redirección al login

**Resultado Obtenido:**
- ✅ **EXITOSO** - Advertencia mostrada a los 4 minutos
- ✅ Sesión cerrada a los 5 minutos
- ✅ Redirección correcta
- ✅ Token eliminado de localStorage

---

### Prueba 3.2: Extensión de Sesión con Actividad

**Objetivo:** Verificar que la actividad del usuario reinicia el temporizador

**Pasos:**
1. Iniciar sesión
2. Esperar 4 minutos (aparece advertencia)
3. Mover el mouse o hacer scroll
4. Verificar que la advertencia desaparece

**Resultado Esperado:**
- ✅ Temporizador reiniciado
- ✅ Advertencia desaparece
- ✅ Sesión continúa activa

**Resultado Obtenido:**
- ✅ **EXITOSO** - Temporizador reiniciado correctamente
- ✅ Sesión extendida por 5 minutos más

---

## 4. Pruebas de Base de Datos

### Prueba 4.1: Conexión SSL a Railway

**Objetivo:** Verificar la conexión segura a la base de datos

**Configuración:**
```javascript
{
  host: "caboose.proxy.rlwy.net",
  port: 43186,
  ssl: { rejectUnauthorized: false }
}
```

**Resultado Esperado:**
- ✅ Conexión establecida con SSL
- ✅ Sin errores de certificado

**Resultado Obtenido:**
- ✅ **EXITOSO** - Conexión SSL establecida
- ✅ Sin timeouts
- ✅ Latencia promedio: ~150ms

---

### Prueba 4.2: Consultas con Alto Volumen

**Objetivo:** Verificar el rendimiento con múltiples registros

**Datos de Prueba:**
- 50 usuarios registrados en la base de datos

**Resultado Esperado:**
- ✅ Consulta completada en < 3 segundos
- ✅ Todos los registros retornados

**Resultado Obtenido:**
- ✅ **EXITOSO** - 50 registros recuperados en 1.2 segundos
- ✅ Sin pérdida de datos

---

### Prueba 4.3: Integridad de Constraints

**Objetivo:** Verificar que las restricciones de base de datos funcionan

**Casos de Prueba:**
1. Insertar email duplicado → ❌ Error esperado
2. Insertar identificación duplicada → ❌ Error esperado
3. Insertar nombre_usuario duplicado → ❌ Error esperado

**Resultado Obtenido:**
- ✅ **EXITOSO** - Todas las constraints funcionan correctamente
- ✅ Errores manejados apropiadamente en el backend

---

## 5. Pruebas de Integración

### Prueba 5.1: Flujo Completo de Usuario

**Objetivo:** Probar el ciclo de vida completo de un usuario

**Flujo:**
1. Registro → 2. Auto-verificación → 3. Login → 4. Dashboard → 5. Gestión → 6. Logout

**Resultado Esperado:**
- ✅ Todos los pasos completados sin errores

**Resultado Obtenido:**
- ✅ **EXITOSO** - Flujo completo funcionando
- ✅ Tiempo total: ~15 segundos
- ✅ Sin errores ni interrupciones

---

### Prueba 5.2: CORS entre Dominios

**Objetivo:** Verificar que el frontend en Vercel puede comunicarse con backend en Render

**Configuración:**
```javascript
CORS Origin: https://segura-mente-app-frontend.vercel.app
```

**Resultado Esperado:**
- ✅ Peticiones permitidas desde el dominio configurado
- ❌ Peticiones rechazadas desde otros dominios

**Resultado Obtenido:**
- ✅ **EXITOSO** - CORS configurado correctamente
- ✅ Frontend puede hacer todas las peticiones
- ✅ Dominios no autorizados bloqueados

---

### Prueba 5.3: Manejo de Cold Start (Render)

**Objetivo:** Verificar el comportamiento después de inactividad

**Escenario:**
- Backend inactivo por 15+ minutos (spin down)
- Primera petición después del spin down

**Resultado Esperado:**
- ⏰ Primera petición: 30-60 segundos
- ✅ Peticiones subsecuentes: < 3 segundos

**Resultado Obtenido:**
- ✅ **EXITOSO** - Primera petición: ~45 segundos
- ✅ Peticiones siguientes: ~1.5 segundos
- ✅ Usuario informado con loading indicator

---

## 6. Configuración de Ambientes

### Ambiente de Desarrollo

**Frontend:**
```
URL: http://localhost:3000
API: http://localhost:5000/api
Node: v18+
React: 19.2.0
```

**Backend:**
```
URL: http://localhost:5000
Puerto: 5000
Node: v18+
Express: 5.2.1
```

**Base de Datos:**
```
Host: localhost
Puerto: 3306
Motor: MySQL 8.0
```

---

### Ambiente de Producción

**Frontend:**
```
Plataforma: Vercel
URL: https://segura-mente-app-frontend.vercel.app/
Build: React Production Build
Node: v18.x (Vercel)
Deploy: Automático desde GitHub main branch
```

**Backend:**
```
Plataforma: Render.com
URL: https://segura-mente-app-ga8-220501096-aa1-ev02.onrender.com
Runtime: Node.js 18.x
Plan: Free Tier
Deploy: Automático desde GitHub main branch
Health Check: GET /
```

**Base de Datos:**
```
Plataforma: Railway
Host: caboose.proxy.rlwy.net
Puerto: 43186
Motor: MySQL 8.0
Red: Pública (Public Networking habilitado)
SSL: Requerido
```

---

## 7. Configuración de Servidores

### Vercel (Frontend)

**Build Settings:**
```
Framework Preset: Create React App
Build Command: npm run build
Output Directory: build
Install Command: npm install
Node Version: 18.x
```

**Environment Variables:**
```
REACT_APP_API_URL=https://segura-mente-app-ga8-220501096-aa1-ev02.onrender.com/api
```

**Configuraciones Adicionales:**
- Auto-deploy desde main branch: ✅
- Production domain: https://segura-mente-app-frontend.vercel.app
- Preview deployments: ✅
- HTTPS: ✅ (automático)

---

### Render (Backend)

**Service Settings:**
```
Type: Web Service
Region: Oregon (US West)
Branch: main
Build Command: npm install
Start Command: npm start
Plan: Free
```

**Environment Variables:**
```
NODE_ENV=production
PORT=10000
DB_HOST=caboose.proxy.rlwy.net
DB_PORT=43186
DB_USER=root
DB_PASSWORD=[secreto]
DB_NAME=railway
DB_SSL=true
JWT_SECRET=[secreto]
JWT_EXPIRE=7d
CLIENT_URL=https://segura-mente-app-frontend.vercel.app
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=apikey
EMAIL_PASS=[API_KEY]
EMAIL_FROM=noreply@seguramente.com
```

**Health Check:**
```
Path: /
Expected Status: 200
Timeout: 30 seconds
```

**Limitaciones del Plan Free:**
- Spin down después de 15 minutos de inactividad
- 750 horas de compute por mes
- Puertos SMTP (587, 465) bloqueados
- Sin conexiones persistentes

---

### Railway (Base de Datos)

**Database Settings:**
```
Engine: MySQL 8.0
Plan: Trial ($5 credit)
Region: us-west1
Storage: 5GB
```

**Networking:**
```
Public Networking: ✅ Habilitado
Public Host: caboose.proxy.rlwy.net
Public Port: 43186
Private Host: mysql.railway.internal (no usado)
SSL: ✅ Requerido
```

**Variables de Conexión:**
```
MYSQL_URL=mysql://root:[password]@caboose.proxy.rlwy.net:43186/railway
MYSQL_PUBLIC_URL=mysql://root:[password]@caboose.proxy.rlwy.net:43186/railway
```

---

## 8. Pruebas de Seguridad

### Prueba 8.1: Encriptación de Contraseñas

**Objetivo:** Verificar que las contraseñas no se almacenan en texto plano

**Método:**
1. Crear usuario con password "Test123!"
2. Consultar directamente en Railway MySQL
3. Verificar formato bcrypt

**Resultado Esperado:**
- ✅ Password con formato bcrypt
- ✅ Ejemplo: `$2b$10$...`

**Resultado Obtenido:**
- ✅ **EXITOSO** - Contraseñas encriptadas con bcrypt
- ✅ 10 rounds de salt aplicados

---

### Prueba 8.2: Validación de JWT

**Objetivo:** Verificar que los endpoints protegidos requieren token válido

**Casos de Prueba:**
1. Petición sin token → ❌ 401 Unauthorized
2. Petición con token inválido → ❌ 401 Unauthorized
3. Petición con token válido → ✅ 200 OK

**Resultado Obtenido:**
- ✅ **EXITOSO** - Middleware de autenticación funcionando
- ✅ Tokens validados correctamente

---

### Prueba 8.3: SQL Injection

**Objetivo:** Verificar protección contra inyección SQL

**Datos de Prueba:**
```
email: "admin' OR '1'='1"
password: "' OR '1'='1"
```

**Resultado Esperado:**
- ❌ Login rechazado
- ✅ Query parametrizada protege contra inyección

**Resultado Obtenido:**
- ✅ **EXITOSO** - Sistema protegido contra SQL injection
- ✅ Queries parametrizadas funcionando

---

## 9. Resumen de Resultados

### Estado General de Pruebas

| Módulo | Pruebas Totales | Exitosas | Fallidas | % Éxito |
|--------|----------------|----------|----------|---------|
| Autenticación | 4 | 4 | 0 | 100% |
| Gestión de Usuarios | 5 | 5 | 0 | 100% |
| Control de Sesión | 2 | 2 | 0 | 100% |
| Base de Datos | 3 | 3 | 0 | 100% |
| Integración | 3 | 3 | 0 | 100% |
| Seguridad | 3 | 3 | 0 | 100% |
| **TOTAL** | **20** | **20** | **0** | **100%** |

---

## 10. Problemas Conocidos y Limitaciones

### 1. Envío de Emails

**Problema:** SMTP bloqueado en Render free tier

**Impacto:** 
- Email de verificación no se envía
- Password recovery deshabilitado

**Workaround Implementado:**
- Auto-verificación de usuarios al registrarse
- Endpoint de password recovery retorna 503

**Solución Futura:**
- Upgrade a Render paid plan
- Migrar a email API (SendGrid API REST en lugar de SMTP)

---

### 2. Cold Start

**Problema:** Backend tarda 30-60 segundos en primera petición después de 15 min inactividad

**Impacto:** 
- Experiencia de usuario degradada en primera carga

**Workaround:**
- Loading indicator en frontend
- Mensaje informativo al usuario

**Solución Futura:**
- Upgrade a Render paid plan (sin spin down)
- Implementar keep-alive ping service

---

### 3. Límite de Conexiones

**Problema:** Railway trial tiene límite de 100 conexiones simultáneas

**Impacto:** 
- Puede afectar en uso concurrente alto

**Solución Implementada:**
- Connection pooling con límites adecuados
- Timeout de 60 segundos

---

## 11. Conclusiones

✅ **El sistema ha pasado todas las pruebas funcionales** con un 100% de éxito.

✅ **La arquitectura de tres capas** (Frontend-Backend-Database) está correctamente implementada y desplegada.

✅ **Las limitaciones conocidas** están documentadas y tienen workarounds implementados.

✅ **El sistema es funcional** para el propósito académico de la evidencia GA8-220501096-AA1-EV02.

✅ **La seguridad básica** está implementada correctamente (encriptación, JWT, validaciones).

---

**Fecha de Pruebas:** Enero 12, 2026  
**Evaluador:** Sistema Automatizado + Pruebas Manuales  
**Ambiente de Prueba:** Producción (Vercel + Render + Railway)
