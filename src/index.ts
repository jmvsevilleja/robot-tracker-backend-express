import express, { Request, Response } from "express";
import cors from "cors";
import "reflect-metadata";
import robotsRouter from "./routes/robots.route";
import bodyParser from "body-parser";
import { connectDB } from "./database";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Robot Tracker API!");
});

app.use("/robots", robotsRouter);

// Connect DB and Start server
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((error) => console.log(error));

export default app;
