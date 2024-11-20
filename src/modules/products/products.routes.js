import { Router } from 'express';
import * as productsController from './products.controller.js';
import { upload } from '../../middlewares/multer.js';
import verifyJwtToken from '../../middlewares/verifyJwtToken.js';
import verifyUserRole from '../../middlewares/verifyUserRole.js';

const router = Router();

router.get('/products', productsController.getAll);
router.get('/products/:id', productsController.getSingleProduct);
router.post(
  '/products',
  verifyJwtToken,
  verifyUserRole(['admin']),
  upload.single('image'),
  productsController.addProduct
);
router.patch(
  '/products/:id',
  verifyJwtToken,
  verifyUserRole(['admin']),
  upload.single('image'),
  productsController.updateProduct
);
router.delete(
  '/products/:id',
  verifyJwtToken,
  verifyUserRole(['admin']),
  productsController.deleteProduct
);

export default router;
