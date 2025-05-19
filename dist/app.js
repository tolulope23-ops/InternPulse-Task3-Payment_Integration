"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
//Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.get("/", (req, res) => {
    res.json({
        "message": "Thank you for using typescript."
    });
});
const start = async () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error connecting to server: ", error);
    }
};
start();
