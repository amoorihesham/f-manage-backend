import { Router } from 'express';
import * as ordersController from './orders.controller.js';
import preInitializeSession from '../../middlewares/preInitializeSession.js';
const router = Router();
const routerAllowedRoles = ['admin', 'delivery'];
router.get('/orders', preInitializeSession(routerAllowedRoles), ordersController.getOrders);
router.get('/orders/:_id', preInitializeSession(routerAllowedRoles), ordersController.getSingleOrder);
router.post('/orders', preInitializeSession(routerAllowedRoles), ordersController.addOrder);
// router.patch('/orders/:_id', preInitializeSession(routerAllowedRoles), ordersController.cancelOrder);
// router.put('/orders/:_id', preInitializeSession(routerAllowedRoles), ordersController.updateOrderStatus);
router.delete('/orders/:_id', preInitializeSession(routerAllowedRoles), ordersController.deleteOrder);

export default router;
