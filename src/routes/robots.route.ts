import express from "express";
import { getRobots, createRobot } from "../controllers/robot.controller";

const router = express.Router();

router.get("/", getRobots);
router.post("/", createRobot);

export default router;
