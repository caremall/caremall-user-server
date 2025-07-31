import { Router } from "express";
import { getBestSellingProducts, getMostWantedProducts, getNewArrivalProducts } from "../controllers/products.controller.mjs";

const router = Router()

router.get('/most-wanted', getMostWantedProducts)
router.get('/new-arrivals', getNewArrivalProducts)
router.get('/best-sellers', getBestSellingProducts)


export default router