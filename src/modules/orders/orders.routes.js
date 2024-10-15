import { Router } from 'express';
import * as ordersController from './orders.controller.js';
const router = Router();

router.get('/orders', ordersController.getOrders);
router.get('/orders/:_id', ordersController.getSingleOrder);
router.post('/orders', ordersController.addOrder);
router.patch('/orders/:_id', ordersController.cancelOrder);
router.put('/orders/:_id', ordersController.updateOrderStatus);
router.delete('/orders/:_id', ordersController.deleteOrder);

export default router;
