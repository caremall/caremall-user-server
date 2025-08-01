import express from 'express';
import {
    createOrder,
    getUserOrders,
    getOrderById,
    cancelOrder,
} from '../controllers/orders.controller.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';



const router = express.Router();

router.post('/', verifyToken, createOrder);

router.get('/', verifyToken, getUserOrders);

router.get('/:id', verifyToken, getOrderById);

router.patch('/:id/cancel', verifyToken, cancelOrder);




export default router;
