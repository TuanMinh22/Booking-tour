import express from "express"
import { createReview, updateReview, deleteReview, getReviews, getReviewByCusId, getReviewByTourId } from "../controllers/review.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createReview);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);
router.get("/customer/:id", getReviewByCusId);
router.get("/tour/:id", getReviewByTourId);
router.get("/", getReviews);

export default router