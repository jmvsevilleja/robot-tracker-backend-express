import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { connectToDatabase } from "./database";

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectToDatabase()
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.error("Failed to connect to database:", err);
  });

// Middleware
//app.use(morgan("dev")); for logs
//app.use(helmet()); for security
app.use(cors());
app.use(express.json());

// Authentication middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "secret",
    (err: any, user: any) => {
      if (err) return res.sendStatus(403);
      req.body.user = user;
      next();
    }
  );
}

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Robot Tracker API!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
