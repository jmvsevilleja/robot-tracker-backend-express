import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Robot } from "../entities/robot.entity";
import { getAvatarUrl } from "../utils/avatar.util";
const ObjectId = require("mongodb").ObjectId;

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

export const getRobot = async (req: Request, res: Response) => {
  const robotRepository = getRepository(Robot);
  const id = new ObjectId(req.params.id);

  const robot = await robotRepository.findOne(id);
  if (!robot) {
    return res.status(404).json({ message: "Robot not found" });
  }
  res.json(robot);
};

export const updateRobot = async (req: Request, res: Response) => {
  const robotRepository = getRepository(Robot);
  const id = new ObjectId(req.params.id);

  const robot = await robotRepository.findOne(id);
  if (!robot) {
    return res.status(404).json({ message: "Robot not found" });
  }

  const { name, purpose } = req.body;
  robot.name = name ?? robot.name;
  robot.purpose = purpose ?? robot.purpose;
  robot.avatarUrl = await getAvatarUrl(name);

  await robotRepository.save(robot);
  res.json(robot);
};

export const deleteRobot = async (req: Request, res: Response) => {
  const robotRepository = getRepository(Robot);
  const id = new ObjectId(req.params.id);

  const robot = await robotRepository.findOne(id);
  if (!robot) {
    return res.status(404).json({ message: "Robot not found" });
  }

  await robotRepository.delete(robot);
  res
    .json({
      status: "success",
      message: `Successfully deleted robot with id ${id}`,
    })
    .sendStatus(204);
};
