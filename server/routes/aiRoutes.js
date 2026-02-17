import express from "express";
const router = express.Router();
import { getAIResponse } from "../controllers/aiController.js";

router.post("/chat", getAIResponse);

export default router;