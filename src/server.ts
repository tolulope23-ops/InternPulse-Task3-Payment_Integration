import dotenv from "dotenv";
dotenv.config();

import app from "./app";

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

const start = async(): Promise<void> =>{
    try {
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Error connecting to server: ", error);
    }
};

start();