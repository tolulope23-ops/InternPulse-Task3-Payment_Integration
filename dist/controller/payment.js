"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_payment = exports.initiate_payment = void 0;
const http_status_codes_1 = require("http-status-codes");
const paystackService = __importStar(require("../services/paystack.services"));
const payment_1 = require("../model/payment");
const types_1 = require("../utils/types");
const initiate_payment = async (req, res) => {
    const { customer_name, customer_email, amount } = req.body;
    try {
        const payment_data = await paystackService.initiatePayment(customer_email, (amount * 100)); // Paystack requires amount in kobo, hence multiplying by 100.
        if (!payment_data) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: false,
                message: 'Payment not successful'
            });
        }
        ;
        //Saves payment details to database
        const new_payment = new payment_1.payment({
            id: (0, types_1.paymentId)(),
            customer_name: customer_name,
            customer_email: customer_email,
            amount: amount,
            reference: payment_data.reference,
            payment_status: "pending",
            payment_date: new Date()
        });
        await new_payment.save();
        // Sends response for payment initialization
        res.status(http_status_codes_1.StatusCodes.OK).json({
            status: 'success',
            message: 'Payment initialised successfully',
            reference: payment_data.reference,
            payment_URL: payment_data.authorization_url
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error processing payment", error
        });
    }
};
exports.initiate_payment = initiate_payment;
const verify_payment = async (req, res) => {
    const { id } = req.params;
    let status;
    try {
        const checkPayment = await payment_1.payment.findOne({ reference: id });
        if (!checkPayment) {
            res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({
                status: false,
                message: 'Payment not found'
            });
            return;
        }
        ;
        // Verifies the payment using Paystack service
        const verify = await paystackService.verifyPayment(id);
        // Checks the status of the payment to update the database.
        if (verify.status === 'abandoned') {
            status = 'Not Completed';
        }
        else {
            status = verify.status;
        }
        ;
        // Updates the payment status in the database
        checkPayment.payment_status = status;
        checkPayment.currency = verify.currency;
        await checkPayment.save();
        res.status(http_status_codes_1.StatusCodes.OK).json({
            payment: checkPayment,
            status: 'success',
            message: 'Payment details retrieved successfully.'
        });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: false,
            message: "Error processing payment", error
        });
    }
};
exports.verify_payment = verify_payment;
