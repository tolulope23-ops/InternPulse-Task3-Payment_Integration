import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import * as paystackService from "../services/paystack.services";
import { payment } from "../model/payment";
import { paymentId } from "../utils/types";


export const initiate_payment = async (req: Request, res: Response) => {
    const {customer_name, customer_email, amount} = req.body;
    
    try {
        const payment_data = await paystackService.initiatePayment(customer_email, (amount * 100)); // Paystack requires amount in kobo, hence multiplying by 100.
        if(!payment_data){
            res.status(StatusCodes.NOT_FOUND).json({
                status: false,
                message: 'Payment not successful'
            });
        };

//Saves payment details to database
        const new_payment = new payment({
            id: paymentId(),
            customer_name: customer_name, 
            customer_email: customer_email, 
            amount: amount, 
            reference: payment_data.reference, 
            payment_status: "pending", 
            payment_date: new Date()
        });
        await new_payment.save();

// Sends response for payment initialization
        res.status(StatusCodes.OK).json({
        status: 'success',
        message: 'Payment initialised successfully',
        reference: payment_data.reference,
        payment_URL: payment_data.authorization_url
        });
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message:"Error processing payment", error
        });
    }
};


export const verify_payment = async (req: Request, res: Response) => {
    const { id } = req.params;
    let status;

    try {
        const checkPayment = await payment.findOne({reference: id});
        if(!checkPayment){
            res.status(StatusCodes.NOT_FOUND).json({
                status: false,
                message: 'Payment not found'
            });
            return;
        };

// Verifies the payment using Paystack service
        const verify = await paystackService.verifyPayment(id);

// Checks the status of the payment to update the database.
        if(verify.status === 'abandoned'){
            status = 'Not Completed';
        } else {
            status = verify.status;
        };

// Updates the payment status in the database
        checkPayment.payment_status = status;
        checkPayment.currency = verify.currency;
        await checkPayment.save();

        res.status(StatusCodes.OK).json({
            payment: checkPayment,
            status: 'success',
            message:'Payment details retrieved successfully.'
        });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message:"Error processing payment", error
        });
    }
};