import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import { User } from "../entities/user.entity";

const router = Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Find the user by email
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ where: { email: email } });

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate and return a JWT token
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "default_secret"
  );
  res.json({ token });
});

export default router;
