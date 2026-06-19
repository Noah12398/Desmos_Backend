import { Router } from 'express';
import * as familyController from './family.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.post('/create', authMiddleware, familyController.createFamily);
router.get('/:id/members',authMiddleware,familyController.getFamilyMembers);
router.delete('/:id/members/:userId',authMiddleware,familyController.removeFamilyMember);

export default router;