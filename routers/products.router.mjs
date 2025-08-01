import { Router } from "express";
import { getBestSellingProducts, getMostWantedProducts, getNewArrivalProducts, getProductById } from "../controllers/products.controller.mjs";

const router = Router()

router.get('/most-wanted', getMostWantedProducts)
router.get('/new-arrivals', getNewArrivalProducts)
router.get('/best-sellers', getBestSellingProducts)
router.get('/:id', getProductById)


export default router