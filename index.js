import express from "express";
import trainRoutes from "./routes/train.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", trainRoutes);

export default app;
