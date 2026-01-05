# Supabase Auth Starter

Este proyecto es un template inicial para aplicaciones que requieren autenticación manejada desde el lado del servidor utilizando Supabase.

El repositorio contiene dos carpetas principales:
- `server`: Backend (Node.js/Express)
- `front`: Frontend (React/Vite)

## Ejecución

### Server

1. Entra en la carpeta del servidor:
   ```bash
   cd server
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Crea un archivo `.env` basado en `.env.example`:
   - `SUPABASE_URL`: Tu URL del proyecto de Supabase.
   - `SUPABASE_ANON_KEY`: Tu clave anónima.
   - `SUPABASE_SERVICE_ROLE_KEY`: Tu clave service role (para administración).
   - `FRONTEND_URL`: URL donde corre el cliente (ej: `http://localhost:5173`).
   - `CORS_ORIGIN`: Origen permitido para CORS (ej: `http://localhost:5173`).
4. Inicia el servidor en modo desarrollo:
   ```bash
   npm run dev
   ```

### Frontend

1. Entra en la carpeta del frontend:
   ```bash
   cd front
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno. Crea un archivo `.env` basado en `.env.example`:
   - `VITE_API_URL`: URL del backend (ej: `http://localhost:4000`).
4. Inicia la aplicación:
   ```bash
   npm run dev
   ```
