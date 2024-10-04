import { Router } from 'express';
import * as userController from './user.controller.js';
import verifyUserToken from '../../middlewares/verifyUserToken.js';

const router = Router();

router.post('/auth/register', userController.register);
router.post('/auth/login', userController.login);
router.delete('/auth', verifyUserToken, userController.deleteAccount);

export default router;
