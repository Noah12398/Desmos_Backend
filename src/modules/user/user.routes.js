import { Router } from 'express';
import * as userController from './user.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/fcm-token', authMiddleware, userController.updateFcmToken);

export default router;
