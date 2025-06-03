"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const paymentSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String },
    reference: { type: String, unique: true },
    payment_status: { type: String, required: true },
    payment_date: { type: Date, required: true }
});
exports.payment = mongoose_1.default.model('paymentDetails', paymentSchema);
