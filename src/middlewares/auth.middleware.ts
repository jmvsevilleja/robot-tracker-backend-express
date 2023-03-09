import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";
import dotenv from "dotenv";
dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: User;
}

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the JWT token from the Authorization header
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret") as {
      email: string;
    };

    // Find the user associated with the token
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({
      where: { email: decoded.email },
    });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Add the authenticated user to the request object
    req.user = user;

    // Call the next middleware function in the chain
    next();
  } catch (error) {
    res.status(401).json({ message: "Authentication failed" });
  }
};
