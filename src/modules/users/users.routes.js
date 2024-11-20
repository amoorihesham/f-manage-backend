import { Router } from 'express';
import verifyJwtToken from '../../middlewares/verifyJwtToken.js';
import verifyUserRole from '../../middlewares/verifyUserRole.js';
import * as usersController from './users.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();

router.get('/users', preInitializeSession, usersController.getAllUsers);
router.get('/users/:_id', verifyJwtToken, verifyUserRole(['admin']), usersController.getUserDetails);
router.post('/users', verifyJwtToken, verifyUserRole(['admin']), usersController.createUser);
router.patch('/users/:_id', verifyJwtToken, verifyUserRole(['admin']), usersController.updateUser);
router.delete('/users/:_id', verifyJwtToken, verifyUserRole(['admin']), usersController.deleteUser);

export default router;
