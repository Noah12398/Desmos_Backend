import { Router } from 'express';
import * as inviteController from './invite.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.get('/', authMiddleware, inviteController.getInvites);
router.patch('/:inviteId/accept', authMiddleware, inviteController.acceptInvite);
router.patch('/:inviteId/reject', authMiddleware, inviteController.rejectInvite);

export default router;