import mongoose from "mongoose";
import { env } from "./env";

mongoose.connection.on("connected", () => {
  console.log("Mongoose connection established");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

export const connectDatabase = async () => {
  try {
    await mongoose.connect(env.mongodbUri);
  } catch (error) {
    console.error("Database connection failed", error);

    process.exit(1);
  }
};

export const disconnectDatabase = async () => {
  await mongoose.disconnect();
};
