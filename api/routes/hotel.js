import express from "express"
import { createHotel, updateHotel, deleteHotel, getHotel, getHotels } from "../controllers/hotel.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createHotel);
router.patch("/:id", updateHotel);
router.delete("/:id", deleteHotel);
router.get("/:id", getHotel);
router.get("/", getHotels);

export default router