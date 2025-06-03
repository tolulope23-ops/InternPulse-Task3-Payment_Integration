// Loads environment variables from .env file
import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGO_URI = process.env.DB_URL; // MongoDB URI from environment variables

const connectDB = async (): Promise<void> => {
    try {
        if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined in environment variables');
    }
        await mongoose.connect(MONGO_URI);
        console.log('Connected to Database');
    } catch (error) {
        console.log("Error connecting to Database:", error);
    }
};

export default connectDB; // Exports connectDB function for use in other modules