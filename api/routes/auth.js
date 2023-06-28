import express from "express";
import { register, login, logout, loginAdmin } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/loginadmin", loginAdmin);
router.post("/logout", logout);

export default router;