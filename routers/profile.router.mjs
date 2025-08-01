import { Router } from "express";
import { updateProfile } from "../controllers/auth.controller.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";

const router = Router()

router.put('/profile', verifyToken, updateProfile);

export default router