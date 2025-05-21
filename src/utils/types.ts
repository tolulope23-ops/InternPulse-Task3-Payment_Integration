export interface paystackPostResponseData {
    status: boolean;
    message: string;
    data: {
      reference: string;
      authorization_url: string;
      access_code: string;
    }
};