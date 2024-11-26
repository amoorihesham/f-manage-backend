import { Router } from 'express';
import { upload } from '../../middlewares/multer.js';
import * as categoriesController from './categories.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();
const routerAllowedRoles = ['admin'];
router.get('/categories', preInitializeSession(routerAllowedRoles), categoriesController.getCategories);
router.get('/categories/:id', preInitializeSession(routerAllowedRoles), categoriesController.getSingleCategory);
router.post('/categories', preInitializeSession(routerAllowedRoles), upload.single('image'), categoriesController.addCategory);
router.patch('/categories/:id', preInitializeSession(routerAllowedRoles), categoriesController.updateCategory);
router.delete('/categories/:id', preInitializeSession(routerAllowedRoles), categoriesController.deleteCategory);

export default router;
