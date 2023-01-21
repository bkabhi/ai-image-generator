import { Router } from "express";
import { openAiRoutes } from "./openAi.routes.js";
import { postRoutes } from "./post.routes.js";

export const routes = Router();

routes.use('/post', postRoutes);
routes.use('/openai', openAiRoutes);