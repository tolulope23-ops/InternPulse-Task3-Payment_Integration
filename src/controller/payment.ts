import {Request, Response} from "express";
import { StatusCodes } from "http-status-codes";
import * as paystackService from "../services/paystack.services";
import { Payment } from "../model/payment";

export const initiate_payment = async (req: Request, res: Response): Promise<void> => {
    const {customer_name, customer_email, amount, txn_reference} = req.body;

    try {
// Checks if payment exist
        const existing_txn = await Payment.findOne({reference: txn_reference});

// If not, call Paystack service to initiate another payment.
        if (!existing_txn) {
            const payment_data = await paystackService.initiatePayment(customer_email, (amount * 100), txn_reference); // Paystack requires amount in kobo, hence multiplying by 100.

// Saves payment to database, if payment initialised successfully.          
            if(payment_data){ 
                const new_payment = new Payment({
                    customer_name: customer_name, 
                    customer_email: customer_email, 
                    amount: amount, 
                    reference: txn_reference,
                    payment_status: "pending", 
                    payment_date: new Date(),
                });
                await new_payment.save();

//  Sends response for payment initialization
                res.status(StatusCodes.OK).json({
                    status: true,
                    message: 'Payment initialised sucsessfully',
                    reference: txn_reference,
                    data: new_payment
                });
                return;
            }
// If payment exist, sends a processing message.
        }else{
            res.status(StatusCodes.OK).json({
                status: true,
                message: 'Payment processing...'
            });
        };
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: error
        });
    }
};


// export const verify_payment = async (req: Request, res: Response) => {
//     const { id } = req.params;
//     let status;

//     try {
//         const checkPayment = await payment.findOne({reference: id});
//         if(!checkPayment){
//             res.status(StatusCodes.NOT_FOUND).json({
//                 status: false,
//                 message: 'Payment not found'
//             });
//             return;
//         };

// // Verifies the payment using Paystack service
//         const verify = await paystackService.verifyPayment(id);

// // Checks the status of the payment to update the database.
//         if(verify.status === 'abandoned'){
//             status = 'Not Completed';
//         } else {
//             status = verify.status;
//         };

// // Updates the payment status in the database
//         checkPayment.payment_status = status;
//         checkPayment.currency = verify.currency;
//         await checkPayment.save();

//         res.status(StatusCodes.OK).json({
//             payment: checkPayment,
//             status: 'success',
//             message:'Payment details retrieved successfully.'
//         });
//     } catch (error) {
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//             status: false,
//             message:"Error processing payment", error
//         });
//     }
// };