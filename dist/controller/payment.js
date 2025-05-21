"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.transaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const paystack_1 = __importDefault(require("../config/paystack"));
const uuid_1 = require("uuid");
const transaction = async (req, res) => {
    const { customer_name, customer_email, amount } = req.body;
    const paymentId = (0, uuid_1.v4)();
    try {
        const initiatePayment = await paystack_1.default.post("/transaction/initialize", {
            email: customer_email,
            amount: amount * 100
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            payment_reference: initiatePayment.data.data.reference,
            payment_URL: initiatePayment.data.data.authorization_url
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Error processing payment"
        });
    }
};
exports.transaction = transaction;
const verifyPayment = async (req, res) => {
    const { reference } = req.body;
    try {
        // const 
    }
    catch (error) {
    }
    // try {
    // const verify = await paystack.get<paystackGetResponseData>(`/transaction/verify/${reference}`);
    //     if (paymentStatus === "success") {
    //         res.status(StatusCodes.OK).json({
    //             status: true,
    //             message: "Payment successful",
    //         });
    //     } else {
    //         res.status(StatusCodes.BAD_REQUEST).json({
    //             status: false,
    //             message: "Payment failed",
    //         });
    //     }
    // } catch (error) {
    //     res.status(StatusCodes.BAD_REQUEST).json({
    //         status: false,
    //         message: "Error verifying payment",
    //     });
    // }
};
exports.verifyPayment = verifyPayment;
