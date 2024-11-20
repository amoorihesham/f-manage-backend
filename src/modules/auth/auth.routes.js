import { Router } from 'express';
import * as authController from './auth.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/initialize-session', preInitializeSession, authController.initializeSession);

export default router;
