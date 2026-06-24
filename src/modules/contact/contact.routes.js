import { Router } from 'express';
import * as contactController from './contact.controller.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js'

const router = Router();

router.post('/sync', authMiddleware, contactController.syncContacts);
router.get('/lookup', authMiddleware, contactController.lookupContacts);
export default router;