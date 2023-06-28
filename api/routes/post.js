import express from "express"
import { createPost, updatePost, deletePost, getPost, getPosts } from "../controllers/post.js";
// import { verifyAdmin, verifyToken, verifyUser } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/create", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);
router.get("/:id", getPost);
router.get("/", getPosts);

export default router