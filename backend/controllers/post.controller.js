import PostModel from '../models/post.model.js'
import { getPhotoUrl } from '../utils/index.js';

// get all posts
export const getAllPosts = async(req, res)=>{
    try {
        const posts = await PostModel.find();
        
        res.status(200).send({ success: true, data: posts });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}

// create post
export const createPost = async(req, res)=>{
    const { name, prompt, photo } = req.body;
    try {
        const photoUrl = await getPhotoUrl(photo);
        const newPost = await PostModel.create({name, prompt, photo: photoUrl.url});

        res.status(200).send({ success: true, data: newPost });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message });
    }
}