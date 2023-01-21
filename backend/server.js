import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { connectMongoDb } from './db/mongoDb.js';
import { routes } from './routes/index.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit:"50mb" }));



app.use('/api/v1/', routes);

app.get('/', (req, res) => {
    res.send("Welcome to Api of Image Generator!");
})



const PORT = process.env.PORT || 8080;

app.listen(PORT, async() => {
    try {
        await connectMongoDb(process.env.MONGODB_URL);
        console.log(`Starting server on http://localhost:${PORT}`);
    } catch (error) {
        console.log(error.message, " error in sever.js");
    }
})