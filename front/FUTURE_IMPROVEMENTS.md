# Mejoras Futuras del Frontend

Este documento detalla las mejoras recomendadas para la aplicación frontend, enfocándose en la seguridad, escalabilidad y experiencia de usuario.

## 🔒 Seguridad

### 1. Gestión de Tokens y Sesiones (Crítico)
Actualmente, el token JWT y los datos del usuario se almacenan en `localStorage`. Esto es vulnerable a ataques XSS (Cross-Site Scripting).
*   **Mejora Sugerida**: Mover el almacenamiento del token de acceso a la memoria de la aplicación (variable de estado) y utilizar `HttpOnly Cookies` para el `refresh_token`.
*   **Por qué**: Las cookies HttpOnly no son accesibles mediante JavaScript, lo que protege el token de sesión contra robos por scripts maliciosos.

### 2. Validación de Inputs
Aunque se usan atributos HTML como `required` y `type`, la validación del lado del cliente puede ser manipulada.
*   **Mejora Sugerida**: Implementar una librería de validación de esquemas como **Zod** junto con **React Hook Form**.
*   **Beneficio**: Permite definir reglas estrictas (complejidad de contraseña, formato de email) reutilizables y proporciona feedback inmediato y tipado seguro.

### 3. Protección de Rutas Robusta
La protección actual revisa si existe un objeto `user`.
*   **Mejora Sugerida**: Validar la expiración del token al cargar la app y configurar interceptores en las peticiones HTTP (Axios o fetch wrappers) para manejar automáticamente los errores 401 (No autorizado) y cerrar la sesión o renovar el token.

### 4. Cabeceras de Seguridad
*   **Mejora Sugerida**: Asegurar que la comunicación con el backend incluya cabeceras de seguridad adecuadas (CORS configurado estrictamente en el backend, CSP en el frontend).

## 🛠 Funcionalidad y Arquitectura

### 1. Gestión de Estado del Servidor
Actualmente se usa `useEffect` y `fetch` manual para cargar datos y `useState` para el estado de carga/error.
*   **Mejora Sugerida**: Implementar **TanStack Query (React Query)**.
*   **Beneficio**: Manejo automático de caché, reintentos en caso de fallo, estados de carga/error estandarizados y invalidación de datos obsoletos. Simplifica drásticamente el código de los componentes.

### 2. Manejo de Variables de Entorno
*   **Mejora Sugerida**: Asegurar que todas las URLs de API y configuraciones sensibles utilicen variables de entorno (ej. `import.meta.env.VITE_API_URL`) en lugar de estar hardcodeadas como `http://localhost:4000`.

### 3. Feedback al Usuario (UI/UX)
Las alertas actuales son mensajes de texto simples.
*   **Mejora Sugerida**: Integrar un sistema de "Toasts" (notificaciones emergentes) como `sonner` o `react-hot-toast` para confirmar acciones (Login exitoso, Error de red, Usuario creado).
*   **Mejora Sugerida**: Usar "Skeletons" (esqueletos de carga) en lugar de un texto "Cargando..." para mejorar latencia percibida.

### 4. Testing
*   **Mejora Sugerida**:
    *   **Unit Testing**: Configurar **Vitest** y **React Testing Library** para probar componentes aislados y lógica de negocio (como `auth.service.ts`).
    *   **E2E Testing**: Implementar **Playwright** o **Cypress** para probar flujos críticos completos (Login -> Dashboard -> Crear Usuario).

### 5. Internacionalización (i18n)
*   **Mejora Sugerida**: Preparar la app para múltiples idiomas usando librerías como `react-i18next`, extrayendo los textos "hardcodeados" a archivos de traducción.

---

## 📋 Plan de Acción Prioritario

1.  **Inmediato**: Extraer la URL de la API a variables de entorno.
2.  **Corto Plazo**: Implementar **React Query** para limpiar la lógica de fetching y mejorar la UX.
3.  **Medio Plazo**: Migrar el almacenamiento de tokens de `localStorage` a un flujo más seguro (cookies o memoria con refresh silencioso).
4.  **Largo Plazo**: Implementar suite de tests automatizados.
