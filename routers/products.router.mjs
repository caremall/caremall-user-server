import { Router } from "express";
import { getMostWantedProducts, getNewArrivalProducts } from "../controllers/products.controller.mjs";

const router = Router()

router.get('/most-wanted', getMostWantedProducts)
router.get('/new-arrivals', getNewArrivalProducts)


export default router