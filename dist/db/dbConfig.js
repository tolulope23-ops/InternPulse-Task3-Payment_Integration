"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Loads environment variables from .env file
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const MONGO_URI = process.env.DB_URL; // MongoDB URI from environment variables
const connectDB = async () => {
    try {
        if (!MONGO_URI) {
            throw new Error('MONGO_URI is not defined in environment variables');
        }
        await mongoose_1.default.connect(MONGO_URI);
        console.log('Connected to Database');
    }
    catch (error) {
        console.log("Error connecting to Database:", error);
    }
};
exports.default = connectDB; // Exports connectDB function for use in other modules
