import { Router } from 'express';
import * as subCategoriesController from './subCategories.controller.js';
import { upload } from '../../middlewares/multer.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();

router.get('/sub-categories', preInitializeSession, subCategoriesController.getSubCategories);
router.get('/sub-category/:id', preInitializeSession, subCategoriesController.getSubCategory);
router.post('/sub-category', upload.single('image'), subCategoriesController.addSubCategory);
router.patch('/sub-category/:id', subCategoriesController.updateSubCategory);
router.delete('/sub-category/:id', subCategoriesController.deleteSubCategory);

export default router;
