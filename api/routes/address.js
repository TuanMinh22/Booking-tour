import express from "express"
import { getAddress } from "../controllers/address.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.get("/", getAddress);

export default router