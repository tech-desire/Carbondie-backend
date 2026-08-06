import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";

import { env } from "./config/env";
import { errorHandler } from "./middleware/error.middleware";
const app = express();

app.use(helmet());

app.use(
  cors({
    origin: env.clientUrl||'*',
    credentials: true,
  }),
);
app.use(express.json());

app.use(compression());
app.use(cookieParser());


app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);

app.get("/health", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});
app.use(errorHandler);

export default app;