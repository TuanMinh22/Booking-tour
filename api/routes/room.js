import express from "express"
import { createRoom, updateRoom, deleteRoom, getRoom, getRooms, getTourByHotel } from "../controllers/room.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createRoom);
router.patch("/:id", updateRoom);
router.delete("/:id", deleteRoom);
router.get("/getRoom/:id", getTourByHotel);
router.get("/:id", getRoom);
router.get("/", getRooms);

export default router