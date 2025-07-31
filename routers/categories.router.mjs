import { Router } from "express";
import { getAllCategories } from "../controllers/categories.controller.mjs";

const router = Router()

router.get('/', getAllCategories)

export default router
