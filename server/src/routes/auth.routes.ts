import { Router } from 'express';
import { signup, login, me, forgotPassword, resetPassword } from '../controllers/auth';
import { authMiddleware } from '../middlewares/auth.middleware';
import { authLimiter } from '../middlewares/rate-limit.middleware';

const router = Router();

router.post('/login', authLimiter, login);
router.post('/signup', authLimiter, signup);
router.post('/forgot-password', authLimiter, forgotPassword);
router.post('/reset-password', authMiddleware, resetPassword);
router.get('/me', authMiddleware, me);

export default router;
