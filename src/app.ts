import dotenv from "dotenv";
dotenv.config();

import express, {Request, Response} from "express";
import cors from "cors";

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;
app.get("/", (req: Request, res: Response) => {
    res.json({
        "message": "Thank you for using typescript."
    })
});

const start = async(): Promise<void> =>{
    try {
        app.listen(PORT, () =>{
            console.log(`Server is running on port ${PORT}`);
            
        })
    } catch (error) {
        console.log("Error connecting to server: ", error);
    }
} 

start();



