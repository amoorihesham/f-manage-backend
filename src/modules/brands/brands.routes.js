import { Router } from 'express';
import * as brandsController from './brands.controller.js';
import { upload } from '../../middlewares/multer.js';

const router = Router();

router.get('/brands', brandsController.getBrands);
router.get('/brands/:id', brandsController.getSingleBrand);
router.post('/brands', upload.single('image'), brandsController.addBrand);
router.patch('/brands/:id', upload.single('image'), brandsController.updateBrand);
router.delete('/brands/:id', brandsController.deleteBrand);

export default router;
