import { Router } from 'express';
import * as productsController from './products.controller.js';
import { upload } from '../../middlewares/multer.js';

const router = Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getSingleProduct);
router.post('/products', upload.single('image'), productsController.addProduct);
router.patch('/products/:id', productsController.updateProduct);
router.delete('/products/:id', productsController.deleteProduct);

export default router;
