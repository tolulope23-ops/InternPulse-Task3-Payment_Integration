"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const dbConfig_1 = __importDefault(require("./db/dbConfig"));
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
const start = async () => {
    try {
        await (0, dbConfig_1.default)();
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        console.log("Error connecting to server: ", error);
    }
};
start();
