import { Router } from 'express';
import * as ordersController from './orders.controller.js';
const router = Router();

router.get('/orders', ordersController.getOrders);
router.get('/orders/:_id', ordersController.getSingleOrders);
router.post('/orders', ordersController.addOrders);
router.patch('/orders/:_id', ordersController.updateOrders);
router.delete('/orders/:_id', ordersController.deleteOrders);

export default router;
