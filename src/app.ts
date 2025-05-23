import express from "express";
import cors from "cors"; 

const app = express();
import payment from "./routes/payment";
import payment_Details  from "./routes/payment";

//Middlewares
app.use(cors());
app.use(express.json());


//Routes
app.use("/api/v1/", payment);
app.use("/api/v1/", payment_Details);

export default app;





