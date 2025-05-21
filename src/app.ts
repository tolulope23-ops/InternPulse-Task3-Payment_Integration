import express from "express";
import cors from "cors"; 

const app = express();
import paymentRoute from "./routes/payment";

//Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use("/api/v1/", paymentRoute)

export default app;





