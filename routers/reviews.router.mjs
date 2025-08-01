import { Router } from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviews.controller.mjs";

const router = Router()

router.post('/', createReview)
router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.put('/:id', updateReview)
router.delete('/:id', deleteReview)



export default router