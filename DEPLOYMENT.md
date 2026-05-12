# Guía de Despliegue - Segura Mente App

## Despliegue recomendado

- Frontend: Vercel
- Backend: Render
- Base de datos: Supabase PostgreSQL

## 1. Base de datos en Supabase

1. Crea un proyecto nuevo en Supabase.
2. Entra al SQL Editor.
3. Ejecuta el contenido de [backend/database.sql](backend/database.sql).
4. Copia la `DATABASE_URL` desde Settings > Database.
5. Verifica que el acceso use SSL.

## 2. Backend en Render

1. Entra a Render y crea un Web Service.
2. Conecta el repositorio del proyecto.
3. Configura:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Instance Type: `Free`
4. Agrega estas variables de entorno:

```env
NODE_ENV=production
PORT=10000
DATABASE_URL=<tu_database_url_de_supabase>
DATABASE_SSL=true
JWT_SECRET=<genera_una_clave_aleatoria_larga>
JWT_EXPIRE=7d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=<tu_correo@gmail.com>
EMAIL_PASS=<tu_app_password>
EMAIL_FROM=<tu_correo@gmail.com>
CLIENT_URL=<URL_de_tu_frontend_en_Vercel>
```

5. Despliega y guarda la URL del backend.

## 3. Frontend en Vercel

1. Entra a Vercel y crea un proyecto nuevo.
2. Conecta el mismo repositorio.
3. Configura:
   - Framework Preset: `Create React App`
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Agrega esta variable de entorno:

```env
REACT_APP_API_URL=https://<tu-backend-en-render>/api
```

5. Despliega el frontend.

## 4. CORS

En `backend/server.js`, el backend ya usa `CLIENT_URL` para permitir peticiones desde el frontend.

## 5. Verificación rápida

- Abre la URL del frontend en Vercel.
- Verifica login y registro.
- Revisa los logs del backend en Render si algo falla.

## 6. Notas importantes

- Supabase es la opción recomendada si quieres costo cero con más estabilidad que un MySQL free tier variable.
- El backend sigue en Render free.
- El frontend sigue en Vercel.
