import { Router } from "express";
import { dalleRoutes } from "./dalle.routes.js";
import { postRoutes } from "./post.routes.js";

export const routes = Router();

routes.use('/post', postRoutes);
routes.use('/dalle', dalleRoutes);