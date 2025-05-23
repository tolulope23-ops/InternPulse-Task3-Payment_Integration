import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import paystack from "../config/paystack";
import  {payment, paystackPostResponseData, paystackVerifyResponseData}  from "../utils/types";

export const transaction = async (req: Request, res: Response) => {
    const {customer_name, customer_email, amount} = req.body;

    try {
        const initiatePayment = await paystack.post<paystackPostResponseData>("/transaction/initialize", {
            email: customer_email,
            amount: amount * 100,
            metadata: {customer_name}
        });

        if(!initiatePayment){
            res.status(StatusCodes.BAD_REQUEST).json({
                success: "false",
                message: "incorrect payment information"
            });
        }

        const paymentInfo = initiatePayment.data.data;
        const id = paymentInfo.reference;

        payment.push({
                id,
                customer_name,
                customer_email,
                amount,
                status: "pending"
            });
            

        res.status(StatusCodes.OK).json({
            status: true,
            message: "Payment initialised successfully",
            paymentId: id,
            payment_URL: paymentInfo.authorization_url
        });
    } 
    
    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message:"Error processing payment"
        });
    }
};


export const displayTransaction = async (req: Request, res: Response) => {
    const {id} = req.params;
    const checkTransaction = payment.find(paymentID => paymentID.id == id);

    if (!checkTransaction) {
         res.status(StatusCodes.NOT_FOUND).json({
            status: false,
            message: "payment not found"
        });
    }

    try {
        if (checkTransaction) {
            const verify = await paystack.get<paystackVerifyResponseData>(`/transaction/verify/${id}`);
            const paymentStatus = verify.data.data.status;
            const paymentAmount = verify.data.data.amount;

            const formatAmount = parseFloat((paymentAmount / 100).toFixed(2));
            
            checkTransaction.status = paymentStatus;
            if(paymentStatus === "success"){
                checkTransaction.status = "completed";
            };

            checkTransaction.amount = Number(formatAmount);

            res.status(StatusCodes.OK).json({
            payment: {
              id: checkTransaction.id,
              customer_name: checkTransaction.customer_name,
              customer_email: checkTransaction.customer_email,
              amount: checkTransaction.amount,
              status: checkTransaction.status
            },
            status: "success",
            message: "Payment details retrieved successfully."
        });

       } else {
           res.status(StatusCodes.NOT_FOUND).json({
               status: false,
               message: "Payment detail not available."
           });
       }
    } 

    catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
            status: false,
            message:"Error retrieving payment",
        });
    }

};