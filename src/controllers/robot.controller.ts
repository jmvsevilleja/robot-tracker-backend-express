import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Robot } from "../entities/robot.entity";

export const createRobot = async (req: Request, res: Response) => {
  const { name, purpose, avatarUrl } = req.body;
  const robotRepository = getRepository(Robot);

  const robot = robotRepository.create({
    name,
    purpose,
    avatarUrl,
  });

  await robotRepository.save(robot);
  res.status(201).json(robot);
};

export const getRobots = async (req: Request, res: Response) => {
  const robotRepository = getRepository(Robot);

  const robots = await robotRepository.find();
  res.json(robots);
};
