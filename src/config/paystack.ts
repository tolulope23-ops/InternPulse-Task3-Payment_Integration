import dotenv from "dotenv";    // Load environment variables from .env file
dotenv.config();
import axios from "axios";

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;  // Paystack secret key from environment variables
 
const paystack = axios.create({
    baseURL: "https://api.paystack.co", // Base URL for Paystack API
    headers: {
        "Authorization": `Bearer ${PAYSTACK_SECRET_KEY}`, // Authorization header with Paystack secret key
        "content-Type": "application/json"
    }
});

export default paystack;