// routes/train.js
import express from "express";
import trainTroopsHandler from "../handler/trainTroops.js";

const router = express.Router();
router.post("/train-troops", trainTroopsHandler);

export default router;