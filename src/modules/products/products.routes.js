import { Router } from 'express';
import * as productsController from './products.controller.js';
import { upload } from '../../middlewares/multer.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';

const router = Router();
const routerAllowedRoles = ['admin', 'seller'];
router.get('/products', preInitializeSession(routerAllowedRoles), productsController.getAll);
router.get('/products/:id', preInitializeSession(routerAllowedRoles), productsController.getSingleProduct);
router.post('/products', preInitializeSession(routerAllowedRoles), upload.single('image'), productsController.addProduct);
router.patch('/products/:id', preInitializeSession(routerAllowedRoles), productsController.updateProduct);
router.delete('/products/:id', preInitializeSession(routerAllowedRoles), productsController.deleteProduct);

export default router;
