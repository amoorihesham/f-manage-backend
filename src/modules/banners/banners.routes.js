import { Router } from 'express';
import * as bannersController from './banners.controller.js';
import { upload } from '../../middlewares/multer.js';
const router = Router();

router.get('/banners', bannersController.getBanners);
router.get('/banners/:id', bannersController.getSingleBanner);
router.post('/banners', upload.single('image'), bannersController.addBanner);
router.delete('/banners/:id', bannersController.deleteBanner);

export default router;
