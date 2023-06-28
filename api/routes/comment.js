import express from "express"
import { createComment, updateComment, deleteComment, getComments, getCommentByCusId, getCommentByPostId } from "../controllers/comment.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);
router.get("/customer/:id", getCommentByCusId);
router.get("/post/:id", getCommentByPostId);
router.get("/", getComments);

export default router