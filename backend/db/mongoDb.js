import mongoose from "mongoose";

export const connectMongoDb = async (dbUrl)=>{
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(dbUrl);
        console.log("DB connected Successfully");
    } catch (error) {
        console.log(error.message, "not connected");
    }
}