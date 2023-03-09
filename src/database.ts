import { createConnection, ConnectionOptions } from "typeorm";
import { Robot } from "./entities/robot.entity";

const connectionOpts: ConnectionOptions = {
  type: "mongodb",
  //url: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/robots",
  host: process.env.DB_HOST || "127.0.0.1",
  port: parseInt(process.env.DB_PORT || "27017", 10),
  database: process.env.DB_NAME || "robots",
  entities: [Robot],
  synchronize: true,
};

export const connectDB = async () => {
  try {
    const connection = await createConnection(connectionOpts);
    console.log("Connected to MongoDB database", connection.options);
  } catch (error) {
    console.error("Failed to connect to MongoDB database:", error);
  }
};
