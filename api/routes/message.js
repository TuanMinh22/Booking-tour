import express from "express"
import { createMessage, getMessByCus, getMessageByCustomer, getMessages } from "../controllers/message.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createMessage);
router.get("/getUser", getMessageByCustomer);
router.get("/getUser/:id", getMessByCus);
router.get("/", getMessages);

export default router