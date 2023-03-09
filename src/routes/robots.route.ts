import { Router } from "express";
import {
  getRobots,
  getRobot,
  createRobot,
  updateRobot,
  deleteRobot,
} from "../controllers/robot.controller";

const router = Router();

router.get("/", getRobots);
router.post("/", createRobot);
router.get("/:id", getRobot);
router.put("/:id", updateRobot);
router.delete("/:id", deleteRobot);

export default router;
