import express, {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import paystack from "../config/paystack";
import  {paystackPostResponseData}  from "../utils/types";

export const transaction = async (req: Request, res: Response) =>{
    const {customer_name, customer_email, amount} = req.body;

    try {
        const initiatePayment = await paystack.post<paystackPostResponseData>("/transaction/initialize",{
            email: customer_email,
            amount: amount * 100
        }) as {
             data: { 
                data: {
                    authorization_url: string,
                    reference: string 
                }
            }
        };

        res.status(StatusCodes.OK).json({
            status: true,
            message: "Payment processing...",
            payment_reference:initiatePayment.data.data.reference,
            payment_URL: initiatePayment.data.data.authorization_url
        });
    } 
    
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message:"Error processing payment"
        });
    }
};
