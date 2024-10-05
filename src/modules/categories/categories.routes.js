import { Router } from 'express';
import { upload } from '../../middlewares/multer.js';
import * as categoriesController from './categories.controller.js';

const router = Router();

router.get('/categories', categoriesController.getCategories);
router.get('/categories/:id', categoriesController.getSingleCategory);
router.post('/categories', upload.single('image'), categoriesController.addCategory);
router.patch('/categories/:id', categoriesController.updateCategory);
router.delete('/categories/:id', categoriesController.deleteCategory);

export default router;
