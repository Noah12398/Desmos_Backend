import { Router } from 'express';
import * as authController from './auth.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.post('/signin', authMiddleware, authController.signin);
router.post('/register', authMiddleware, authController.register);
router.get('/me', authMiddleware, authController.me);

export default router;