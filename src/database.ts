import { createConnection, Connection } from "typeorm";
import { Robot } from "./entities/Robot";

export async function connectToDatabase(): Promise<Connection> {
  const connection = await createConnection({
    type: "mongodb",
    url: process.env.DB_URL || "mongodb://localhost:27017",
    database: process.env.DB_NAME || "robot-tracker",
    entities: [Robot],
    synchronize: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database!");
  return connection;
}
