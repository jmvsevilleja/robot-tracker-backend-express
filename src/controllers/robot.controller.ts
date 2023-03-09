import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Robot } from "../entities/robot.entity";
import { getAvatarUrl } from "../utils/avatar.util";

export const createRobot = async (req: Request, res: Response) => {
  const { name, purpose } = req.body;
  const robotRepository = getRepository(Robot);

  // get a random avatar
  const avatarUrl = await getAvatarUrl(name);

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
