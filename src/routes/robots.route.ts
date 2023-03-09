import { Router } from "express";
import {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
} from "../controllers/robot.controller";
// Import the middleware function for JWT authentication
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/", auth, getRobots);
router.post("/", auth, createRobot);
router.get("/:id", auth, getRobot);
router.put("/:id", auth, updateRobot);
router.delete("/:id", auth, deleteRobot);

export default router;
