import { Router } from 'express';
import * as inviteController from './invite.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.get('/', authMiddleware, inviteController.getInvites);
// router.post('/:id/accept', authMiddleware, inviteController.acceptInvite);
// router.post('/:id/reject', authMiddleware, inviteController.rejectInvite);

export default router;