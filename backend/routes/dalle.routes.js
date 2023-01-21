import { Router } from "express";
import { Configuration, OpenAIApi } from 'openai';

export const dalleRoutes = Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

dalleRoutes.get('/', (req, res)=>{
    res.send("Hello from dalle")
})


dalleRoutes.post('/', async(req, res)=>{
    try {
        const { prompt } = req.body;
        const aiResult = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        })
        const image = aiResult.data.data[0].b64_json;
        res.status(200).send({photo: image});
    } catch (error) {
        res.status(500).send({error: error.message})
    }
})