import { Router } from 'express';
import * as bannersController from './banners.controller.js';
import { upload } from '../../middlewares/multer.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';
const router = Router();
const routerAllowedRoles = ['admin'];
router.get('/banners', preInitializeSession(routerAllowedRoles), bannersController.getBanners);
router.get('/banners/:id', preInitializeSession(routerAllowedRoles), bannersController.getSingleBanner);
router.post('/banners', preInitializeSession(routerAllowedRoles), upload.single('image'), bannersController.addBanner);
router.delete('/banners/:id', preInitializeSession(routerAllowedRoles), bannersController.deleteBanner);

export default router;
