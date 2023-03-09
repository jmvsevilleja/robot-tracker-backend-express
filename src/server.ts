import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import { createConnection } from "typeorm";
import dotenv from "dotenv";
import robotsRouter from "./routes/robots.route";
import bodyParser from "body-parser";
import { connectDB } from "./database";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Robot Tracker API!");
});

connectDB()
  .then(() => {
    console.log(`Connected to database.`);
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/robots", robotsRouter);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`Database connection error: ${error}`);
  });

export default app;
