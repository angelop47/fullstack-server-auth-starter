import { Router } from 'express';
import { me } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', authMiddleware, me);

export default router;
