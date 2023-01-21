import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";

export const postRoutes = Router();

postRoutes.get('/', getAllPosts)
postRoutes.post('/', createPost)