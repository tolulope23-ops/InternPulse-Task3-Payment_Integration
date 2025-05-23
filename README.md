# Payment Gateway API
  This is a RESTful API build with **NodeJS**, **Express** and **Typescript** that allows businesses receive payment using **Paystack**.

## Features
- Initiate customer payment via paystack.
- Retrieve transaction details by ID(Payment Refrence).
- API RESTful endpoints
- In memorystorage of payment information
- CI/CD pipeline using GitHub Actions
- Tested using Jest and Supertest

## API Endpoints
Base URL: `/api/v1/`

### Post Endpoint
`/api/v1/payments`

**Initiate a payment**
#### Request Body:
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "amount": 5000
}
```
#### Response Body:
```json
{
    "status": true,
    "paymentInfo": [
        {
            "id": "93vrh877cy",
            "customer_name": "John Doe",
            "customer_email": "john@example.com",
            "amount": "5000",
            "status": "pending"
        }
    ],
    "message": "Payment processing...",
    "payment_URL": "https://checkout.paystack.com/bc93x0gu0cs3b2x"
}
```
### Get Endpoint
`/api/v1/payments/{id}`

#### Response Body
```json
{
   "payment": {
        "id": "93vrh877cy",
        "customer_name": "John Doe",
        "customer_email": "john@example.com",
        "amount": 5000.00,
        "status": "completed"
    },
    "status": "success",
    "message": "Payment details retrieved successfully."
}
```
## Testing
```bash
npm test
```
### Deplyment
Render

