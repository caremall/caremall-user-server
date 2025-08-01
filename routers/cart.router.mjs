
import { Router } from 'express';
import {
    addToCart,
    getCart,
    updateCartItem,
    removeCartItem,
    clearCart,
} from '../controllers/cart.controller.mjs';
import { verifyToken } from '../middlewares/verifyToken.mjs';

const router = Router();


router.use(verifyToken);

router.post('/add', addToCart);

router.get('/', getCart);

router.put('/update', updateCartItem);

router.delete('/remove', removeCartItem);

router.delete('/clear', clearCart);



export default router;
