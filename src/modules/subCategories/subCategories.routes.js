import { Router } from 'express';
import * as subCategoriesController from './subCategories.controller.js';
import { upload } from '../../middlewares/multer.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();
const routerAllowedRoles = ['admin'];
router.get('/sub-categories', preInitializeSession(routerAllowedRoles), subCategoriesController.getSubCategories);
router.get('/sub-category/:id', preInitializeSession(routerAllowedRoles), subCategoriesController.getSubCategory);
router.post('/sub-category', preInitializeSession(routerAllowedRoles), upload.single('image'), subCategoriesController.addSubCategory);
router.patch('/sub-category/:id', preInitializeSession(routerAllowedRoles), subCategoriesController.updateSubCategory);
router.delete('/sub-category/:id', preInitializeSession(routerAllowedRoles), subCategoriesController.deleteSubCategory);

export default router;
