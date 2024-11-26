import { Router } from 'express';
import * as usersController from './users.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();
const routerAllowedRoles = ['admin'];
router.get('/users', preInitializeSession(routerAllowedRoles), usersController.getAllUsers);
router.get('/users/:_id', preInitializeSession(routerAllowedRoles), usersController.getUserDetails);
router.post('/users', preInitializeSession(routerAllowedRoles), usersController.createUser);
router.patch('/users/:_id', preInitializeSession(routerAllowedRoles), usersController.updateUser);
router.delete('/users/:_id', preInitializeSession(routerAllowedRoles), usersController.deleteUser);

export default router;
