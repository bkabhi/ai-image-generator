import { Router } from "express";
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import PostModel from '../models/post.model.js'

dotenv.config();

export const postRoutes = Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// get all posts
postRoutes.get('/', async(req, res)=>{
    try {
        const posts = await PostModel.find();
        
        res.status(200).send({ success: true, data: posts });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
})

// create post
postRoutes.post('/', async(req, res)=>{
    const { name, prompt, photo } = req.body;
    try {
        const photoUrl = await cloudinary.uploader.upload(photo);
        const newPost = await PostModel.create({name, prompt, photo: photoUrl.url});

        res.status(200).send({ success: true, data: newPost });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
})