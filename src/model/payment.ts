import mongoose, { Schema, Document } from "mongoose";

export interface PaymentDetails extends Document{
    id: string,
    customer_name: string,
    customer_email: string,
    amount: number,
    currency?: string,
    reference: string,
    payment_method?: string,
    payment_status: string,
    payment_date: Date
}

const paymentSchema = new mongoose.Schema<PaymentDetails> ({
    id:{
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
        unique: true
    },

    amount: { type: Number, required: true },
    currency: { type: String},
    reference: {type: String, unique: true},
    payment_method: {type: String},
    payment_status: {type: String, required: true},
    payment_date: {type: Date, required: true}

});

export const payment = mongoose.model<PaymentDetails>('paymentDetails', paymentSchema);