// app.js
import express from "express";
import trainRoutes from "./routes/train.js";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "@vercel/node";



dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", trainRoutes);

export function startServer(port = 3000) {
  app.listen(port, () => {
    console.log(`🚀 Server running on port ${port}`);
  });
}
startServer(3000);
export default createServer(app);
