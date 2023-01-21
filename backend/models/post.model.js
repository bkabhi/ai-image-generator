import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        prompt: { type: String, required: true },
        photo: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const PostModel = mongoose.model('posts', postSchema);

export default PostModel;