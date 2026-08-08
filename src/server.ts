import app from "./app";
import { env } from "./config/env";
import { connectDatabase, disconnectDatabase } from "./config/database";
import { connectRedis, disconnectRedis } from "./config/redis";

let server: ReturnType<typeof app.listen>;

const startServer = async () => {
  await connectDatabase();
  await connectRedis();
  console.log("Redis URL:", env.redisUrl);
  server = app.listen(env.port, () => {
    console.log(`Server running on port ${env.port}`);
  });
};

const shutdown = async () => {
  console.log("Shutting down...");

  server?.close();

  await disconnectDatabase();
  await disconnectRedis();

  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

startServer();
