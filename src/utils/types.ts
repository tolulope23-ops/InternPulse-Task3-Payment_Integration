import { v4 as uuidv4 } from 'uuid';
export const paymentId = () =>{
    const id = uuidv4().substring(0, 12);
    return id;
}


export interface paystackPostResponseData {
    status: boolean;
    message: string;
    data: {
      reference: string;
      authorization_url: string;
      access_code: string;
    }
};

export interface paystackVerifyResponseData {
    status: boolean,
    message: string,
    data: {
        id: number,
        domain: string,
        status: string,
        reference: string,
        receipt_number: string,
        amount: number,
        message: null,
        gateway_response: string,
        helpdesk_link: string,
        paid_at: string,
        created_at: string,
        channel: string,
        currency: string,
        ip_address: string,
        metadata: string,
        log: {
        start_time: number,
        time_spent: number,
        attempts: number,
        errors: number,
        success: boolean,
        mobile: boolean,
        input: Array<string>,
        history: [
            {
            type: string,
            message: string,
            time: number
            },
            {
            type: string,
            message: string,
            time: number
            }
        ]
        },
        fees: number,
        fees_split: string,
        authorization: {
        authorization_code: string,
        bin: string,
        last4: string,
        exp_month: string,
        exp_year: string,
        channel: string,
        card_type: string,
        bank: string,
        country_code: string,
        brand: string,
        reusable: boolean,
        signature: string,
        account_name: string
        },
        customer: {
        id: number,
        first_name: string,
        last_name: string,
        email: string,
        customer_code: string,
        phone: string,
        metadata: {
            custom_fields: [
            {
                display_name: string,
                variable_name: string,
                value: string
            }
            ]
        },
        risk_action: string,
        international_format_phone: string
        },
        plan: object,
        subaccount: object,
        split: object
        order_id: string,
        paidAt: string,
        createdAt: string,
        requested_amount: number,
        pos_transaction_data: string,
        source: {
        type: string,
        source: string,
        identifier: string
        },
        fees_breakdown: string,
        connect: string
    }
}
