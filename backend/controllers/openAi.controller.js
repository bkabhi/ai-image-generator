import { getAiImageFromOpenAi } from '../utils/index.js';

// Create Ai Image 
export const createAiImage = async (req, res) => {
    try {
        const { prompt } = req.body;

        const image = await getAiImageFromOpenAi(prompt);

        res.status(200).json({ success: true, photo: image });
    } catch (error) {
        res.status(500).send({ success: false, error: error.message, message: "error" })
    }
}