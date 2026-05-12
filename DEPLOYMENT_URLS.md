# URLs de Despliegue - Segura Mente App

## Información General

**Proyecto:** Segura Mente - Sistema de Gestión de Usuarios  
**Versión:** 1.0.0  
**Fecha:** 12/01/2026  
**Estudiante:** Juan Pablo Mejia Vargas  
**Evidencia:** GA8-220501096-AA1-EV02 módulos integrados  
**Tipo:** Manual Técnico para Desarrolladores y Administradores

---

## URLs de Producción

### Frontend
- **URL:** https://segura-mente-app-frontend.vercel.app/
- **Plataforma:** Vercel
- **Tecnología:** React
- **Estado:** Activo

### Backend
- **URL:** https://segura-mente-app-ga-000-aa-ev0.onrender.com
- **Plataforma:** Render.com
- **Tecnología:** Node.js + Express
- **Estado:** Activo

### Base de Datos
- **Plataforma:** Supabase
- **Tipo:** PostgreSQL
- **Acceso:** `DATABASE_URL`
- **Estado:** Activo

---

## Endpoints principales

| Endpoint | URL completa |
|----------|-------------|
| Health Check | https://segura-mente-app-ga-000-aa-ev0.onrender.com/ |
| Registro | https://segura-mente-app-ga-000-aa-ev0.onrender.com/api/auth/register |
| Login | https://segura-mente-app-ga-000-aa-ev0.onrender.com/api/auth/login |
| Usuarios | https://segura-mente-app-ga-000-aa-ev0.onrender.com/api/users |

---

## Repositorio

- **GitHub:** https://github.com/Juanflo112/segura-mente-app-GA8-220501096-AA1-EV02.git
- **Rama principal:** main

---

## Notas importantes

- El frontend se despliega en Vercel.
- El backend se despliega en Render.
- La base de datos vive en Supabase PostgreSQL.
- Configura `CLIENT_URL` en Render con la URL del frontend de Vercel.
- Configura `DATABASE_URL` y `DATABASE_SSL=true` en Render.
