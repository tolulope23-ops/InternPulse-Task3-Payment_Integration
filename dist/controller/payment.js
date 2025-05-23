"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayTransaction = exports.transaction = void 0;
const http_status_codes_1 = require("http-status-codes");
const paystack_1 = __importDefault(require("../config/paystack"));
const types_1 = require("../utils/types");
const transaction = async (req, res) => {
    const { customer_name, customer_email, amount } = req.body;
    try {
        const initiatePayment = await paystack_1.default.post("/transaction/initialize", {
            email: customer_email,
            amount: amount * 100,
            metadata: { customer_name }
        });
        const paymentInfo = initiatePayment.data.data;
        const id = paymentInfo.reference;
        types_1.payment.push({
            id,
            customer_name,
            customer_email,
            amount,
            status: "pending"
        });
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: true,
            paymentInfo: types_1.payment,
            message: "Payment processing...",
            payment_URL: paymentInfo.authorization_url
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
const displayTransaction = async (req, res) => {
    const { id } = req.params;
    const checkTransaction = types_1.payment.find(paymentID => paymentID.id == id);
    try {
        if (checkTransaction) {
            const verify = await paystack_1.default.get(`/transaction/verify/${id}`);
            const paymentStatus = verify.data.data.status;
            const paymentAmount = verify.data.data.amount;
            checkTransaction.status = paymentStatus;
            checkTransaction.amount = paymentAmount;
            res.status(http_status_codes_1.StatusCodes.OK).json({
                payment: {
                    id: checkTransaction.id,
                    customer_name: checkTransaction.customer_name,
                    customer_email: checkTransaction.customer_email,
                    amount: checkTransaction.amount.toFixed(2),
                    status: checkTransaction.status
                },
                status: "success",
                message: "Payment details retrieved successfully."
            });
        }
        else {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: false,
                message: "Payment detail not available."
            });
        }
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
            status: false,
            message: "Error retrieving payment",
            err: error
        });
    }
};
exports.displayTransaction = displayTransaction;
