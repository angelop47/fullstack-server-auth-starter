import { Router } from 'express';
import { signup, login, me, forgotPassword, resetPassword } from '../controllers/auth';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rate-limit.middleware';
import { requireAdmin } from '../middlewares/role.middleware';

const router = Router();


// Controla el alta de usuarios:
// - signup → registro público
// - new-user → solo administradores
// Habilitar únicamente la ruta que corresponda al modelo de seguridad.

// curl -X POST http://localhost:4000/api/auth/new-user \
//   -H "Content-Type: application/json" \
//   -H "Authorization: Bearer TU_ACCESS_TOKEN_DE_ADMIN" \
//   -d '{
//     "email": "nuevo@ejemplo.com",
//     "password": "Password123!",
//     "full_name": "Nuevo Usuario"
//   }'

router.post('/login', authLimiter, login);
// router.post('/signup', authLimiter, signup);
router.post('/new-user', authMiddleware, requireAdmin, signup);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authMiddleware, resetPassword);
router.get('/me', authMiddleware, me);

export default router;
