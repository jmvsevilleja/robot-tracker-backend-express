import { Router } from "express";
import { loginUser } from "../controllers/auth.controller";

const router = Router();

// Login route
router.post("/login", loginUser);

export default router;
