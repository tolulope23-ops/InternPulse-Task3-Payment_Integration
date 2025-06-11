import paystack from '../config/paystack';
import { paystackPostResponseData, paystackVerifyResponseData } from '../utils/types';

export const initiatePayment = async (email: string, amount: number, txn_reference: string) => {
    const paystackResponse = await paystack.post<paystackPostResponseData>('/transaction/initialize', {
    email,
    amount,
    txn_reference
});
    return paystackResponse.data.data;
};

export const verifyPayment = async (reference: string) => {
    const paystackVerify = await paystack.get<paystackVerifyResponseData>(`/transaction/verify/${reference}`);
    return paystackVerify.data.data;

};