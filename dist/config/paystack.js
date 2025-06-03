"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv")); // Load environment variables from .env file
dotenv_1.default.config();
const axios_1 = __importDefault(require("axios"));
const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY; // Paystack secret key from environment variables
const paystack = axios_1.default.create({
    baseURL: "https://api.paystack.co", // Base URL for Paystack API
    headers: {
        "Authorization": `Bearer ${PAYSTACK_SECRET_KEY}`, // Authorization header with Paystack secret key
        "content-Type": "application/json"
    }
});
exports.default = paystack;
