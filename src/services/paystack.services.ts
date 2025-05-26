import paystack from '../config/paystack';
import { paystackPostResponseData, paystackVerifyResponseData } from '../utils/types';

export const initiatePayment = async (email: string, amount: number) => {
    const paystackResponse = await paystack.post<paystackPostResponseData>('/transaction/initialize', {
    email,
    amount
});
    return paystackResponse.data.data;
};

export const verifyPayment = async (reference: string) => {
    const paystackVerify = await paystack.get<paystackVerifyResponseData>(`/transaction/verify/${reference}`);
    return paystackVerify.data.data;

};