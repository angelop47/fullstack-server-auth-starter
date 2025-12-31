import { Router } from 'express';
import { signup, login, me, forgotPassword, resetPassword, logout } from '../controllers/auth';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rate-limit.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

/**
 * CONFIGURACIÓN DE REGISTRO DE USUARIOS
 * 
 * Hay dos estrategias disponibles para el registro de usuarios:
 * 
 * 1. Registro público (/signup):
 *    - Cualquier persona puede crear una cuenta
 *    - Útil para aplicaciones SaaS o plataformas abiertas
 *    - Para habilitarla: descomentar router.post('/signup', authLimiter, signup);
 * 
 * 2. Registro restringido (/new-user):
 *    - Solo administradores autenticados pueden crear usuarios
 *    - Ideal para sistemas CRM internos o aplicaciones empresariales
 *    - Actualmente habilitada por defecto
 * 
 * IMPORTANTE: Habilitar únicamente UNA de las dos rutas según el modelo de seguridad requerido.
 * 
 * Ejemplo de uso de /new-user:
 * curl -X POST http://localhost:4000/api/auth/new-user \
 *   -H "Content-Type: application/json" \
 *   -H "Authorization: Bearer TU_ACCESS_TOKEN_DE_ADMIN" \
 *   -d '{
 *     "email": "nuevo@ejemplo.com",
 *     "password": "Password123!",
 *     "full_name": "Nuevo Usuario"
 *   }'
 */

// Rutas de autenticación
router.post('/login', authLimiter, login);
// router.post('/signup', authLimiter, signup); // Registro público (deshabilitado)
router.post('/new-user', authMiddleware, requireAdmin, signup); // Registro restringido a admins
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authMiddleware, resetPassword);
router.post('/logout', logout);
router.get('/me', authMiddleware, me);

export default router;
