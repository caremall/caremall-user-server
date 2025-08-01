import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviews.controller.mjs";
import { verifyToken } from "../middlewares/verifyToken.mjs";

const router = Router()

router.post('/', verifyToken, createReview)
router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.put('/:id', verifyToken, updateReview)
router.delete('/:id', verifyToken, deleteReview)



export default router