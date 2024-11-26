import { Router } from 'express';
import * as authController from './auth.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();
const routerAllowedRoles = ['admin', 'seller', 'delivery', 'user'];
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/initialize-session', preInitializeSession(routerAllowedRoles), authController.initializeSession);
router.get('/logout', authController.logout);

export default router;
