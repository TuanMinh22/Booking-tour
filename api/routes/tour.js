import express from "express"
import { createTour, updateTour, deleteTour, getTour, getTours, searchRes, getFetures, getCount } from "../controllers/tour.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createTour);
router.patch("/:id", updateTour);
router.delete("/:id", deleteTour);
router.get("/search", searchRes);
router.get("/getFetures", getFetures);
router.get("/getCount", getCount);
router.get("/:id", getTour);
router.get("/", getTours);

export default router