# Roadmap de Autenticación

Este documento describe el plan de implementación para convertir el proyecto en un template de autenticación completo y robusto. Las funcionalidades están ordenadas por prioridad e interdependencia.

## Fase 1: Seguridad y Recuperación de Accesos (Prioridad Alta)
*Estas funcionalidades son críticas para evitar que los usuarios pierdan acceso a sus cuentas y para garantizar la seguridad básica.*

- [ ] **Recuperación de Contraseña (Forgot Password)**
    - Endpoint: `POST /api/auth/forgot-password`
    - Funcionalidad: Envía un correo electrónico con un enlace o token para resetear la contraseña.
- [ ] **Restablecer Contraseña (Reset Password)**
    - Endpoint: `POST /api/auth/reset-password`
    - Funcionalidad: Permite establecer una nueva contraseña utilizando el token recibido por correo.

## Fase 2: Gestión de Sesión y Seguridad Activa (Prioridad Media-Alta)
*Mejoras necesarias para el ciclo de vida de la sesión y la seguridad proactiva.*

- [ ] **Cerrar Sesión (Logout)**
    - Endpoint: `POST /api/auth/logout`
    - Funcionalidad: Invalida la sesión actual (útil para clientes web/móviles para limpiar estado).
- [ ] **Cambio de Contraseña (Change Password)**
    - Endpoint: `POST /api/auth/update-password`
    - Funcionalidad: Permite a un usuario autenticado cambiar su contraseña actual por una nueva (requiere confirmar la actual o simplemente estar logueado).
- [ ] **Refresco de Token (Refresh Token)**
    - Endpoint: `POST /api/auth/refresh-token`
    - Funcionalidad: Endpoint explícito para intercambiar un `refresh_token` por un nuevo `access_token` y `refresh_token`.

## Fase 3: Gestión de Perfil de Usuario (Prioridad Media)
*Empoderar al usuario para gestionar su propia información.*

- [ ] **Actualizar Perfil Propio**
    - Endpoint: `PATCH /api/auth/me`
    - Funcionalidad: Permite al usuario logueado modificar su `full_name`, `avatar_url` u otros metadatos permitidos.
- [ ] **Eliminar Cuenta (Delete Account)**
    - Endpoint: `DELETE /api/auth/me`
    - Funcionalidad: Permite al usuario eliminar permanentemente su cuenta y datos asociados.

## Fase 4: Funcionalidades Avanzadas (Prioridad Baja / "Nice to Have")
*Características que mejoran la experiencia pero no son bloqueantes para un MVP.*

- [ ] **Verificación de Email**
    - Endpoint: `POST /api/auth/resend-verification`
    - Funcionalidad: Reenviar el correo de confirmación si el usuario no lo recibió al registrarse.
- [ ] **Autenticación con OAuth (Social Login)**
    - Endpoints: `POST /api/auth/oauth/:provider`
    - Funcionalidad: Iniciar sesión usando proveedores como Google, GitHub, etc.
