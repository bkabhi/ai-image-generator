import { Router } from "express";
import { createAiImage } from "../controllers/openAi.controller.js";

export const openAiRoutes = Router();

openAiRoutes.get('/', (req, res) => res.send("Hello from dalle") );
openAiRoutes.post('/', createAiImage);