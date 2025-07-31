import { Router } from "express";
import { getMostWantedProducts } from "../controllers/products.controller.mjs";

const router = Router()

router.get('/most-wanted', getMostWantedProducts)

export default router