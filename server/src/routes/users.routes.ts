/**
 * Rutas de gestión de usuarios.
 * Todas las rutas requieren autenticación y permisos de administrador.
 */
import { Router } from 'express';
import { updateUser, getUsers } from '../controllers/users';
import { authMiddleware } from '../middlewares/auth.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();

// Middleware: Todas las rutas de usuarios requieren autenticación
router.use(authMiddleware);

// Rutas protegidas - Solo administradores
router.get('/', requireAdmin, getUsers);          // Obtener lista de usuarios
router.patch('/:id', requireAdmin, updateUser);   // Actualizar usuario específico

export default router;
