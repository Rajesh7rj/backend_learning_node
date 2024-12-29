import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
import dotenv from "dotenv";
dotenv.config();

export const connectToDb = async () => {
    try {
        const url = 'mongodb+srv://backend_learning:backend12345@cluster0.udmtw.mongodb.net/'
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);
        console.log(`MongoDB Connected!! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB Connection Error: ==>", error.message);
        process.exit(1);
    }
};

