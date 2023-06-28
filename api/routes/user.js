import express from "express"
import { updateUser, deleteUser, getUser, getUsers, getCount } from "../controllers/user.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/getCount", getCount);
router.get("/:id", getUser);
router.get("/", getUsers);

export default router