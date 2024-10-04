import { Router } from 'express';
import * as subCategoriesController from './subCategories.controller.js';

const router = Router();

router.get('/sub-categories', subCategoriesController.getSubCategories);
router.get('/sub-category/:id', subCategoriesController.getSubCategory);
router.post('/sub-category', subCategoriesController.addSubCategory);
router.patch('/sub-category/:id', subCategoriesController.updateSubCategory);
router.delete('/sub-category/:id', subCategoriesController.deleteSubCategory);

export default router;
