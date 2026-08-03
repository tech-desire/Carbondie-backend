
import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./utils/dbConnect";
import authRouter from "./routes/authRouter";
import productRouter from "./routes/productRoutes";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: process.env.HOST_URL || "*",
  }),
);

app.use(express.json());

app.use("/api/auth", authRouter );
app.use('/api/product',productRouter)

connectDb();

app.listen(process.env.PORT || 7000, () =>
  console.log("Server is connect port", process.env.PORT || 7000),
);
