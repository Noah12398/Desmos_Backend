import { Router } from 'express';
import * as familyController from './family.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.post('/', authMiddleware, familyController.createFamily);
router.get('/', authMiddleware, familyController.getFamilies);
router.get('/:id/members', authMiddleware, familyController.getFamilyMembers);
router.delete('/:id/members/:userId', authMiddleware, familyController.removeFamilyMember);
router.post('/:id/invites',authMiddleware,familyController.inviteUser);

export default router;