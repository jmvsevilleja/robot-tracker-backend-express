import express from "express";
import { getRepository } from "typeorm";
import { Robot } from "../entities/robot.entity";

export const robotRouter = express.Router();

robotRouter.get("/", async (req, res) => {
  const robotRepository = getRepository(Robot);
  const robots = await robotRepository.find();
  res.json(robots);
});

export default robotRouter;
