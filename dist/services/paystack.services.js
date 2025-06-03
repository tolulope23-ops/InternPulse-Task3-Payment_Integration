"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayment = exports.initiatePayment = void 0;
const paystack_1 = __importDefault(require("../config/paystack"));
const initiatePayment = async (email, amount) => {
    const paystackResponse = await paystack_1.default.post('/transaction/initialize', {
        email,
        amount
    });
    return paystackResponse.data.data;
};
exports.initiatePayment = initiatePayment;
const verifyPayment = async (reference) => {
    const paystackVerify = await paystack_1.default.get(`/transaction/verify/${reference}`);
    return paystackVerify.data.data;
};
exports.verifyPayment = verifyPayment;
