import { Router } from "express";
import { getBestSellingProducts, getFilteredProducts, getMostWantedProducts, getNewArrivalProducts, getProductById } from "../controllers/products.controller.mjs";

const router = Router()


router.get('/filter', getFilteredProducts)
router.get('/most-wanted', getMostWantedProducts)
router.get('/new-arrivals', getNewArrivalProducts)
router.get('/best-sellers', getBestSellingProducts)
router.get('/:slug', getProductById)


export default router