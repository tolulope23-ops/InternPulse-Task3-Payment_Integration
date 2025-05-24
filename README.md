# Payment Gateway API
  This is a RESTful API built with **NodeJS**, **Express** and **Typescript** that allows businesses receive payment using **Paystack**.

## Features
- Initiate customer payment via paystack.
- Retrieve transaction details by ID(Payment Refrence).
- API RESTful endpoints.
- In memorystorage of payment information.
- CI/CD pipeline using GitHub Actions.
- Tested using Jest and Supertest.

## Installation
```yml
git clone https://github.com/tolulope23-ops/InternPulse-Task3-Payment_Integration
cd payment-gateway-api (Or any named folder)
npm install
```
## Build and Run Locally
```bash
npm run build
npm start
```

## API Endpoints
Base URL: `/api/v1/`

### Post Endpoint: 
`/api/v1/payments`

**Initiate a payment**
#### Request Body:
```json
{
  "customer_name": "John Doe",
  "customer_email": "john@example.com",
  "amount": 50
}
```
#### Response Body:
```json
{
    "status": true,
    "message": "Payment initialised successfully",
    "paymentId": "dx6q6p036l",
    "payment_URL": "https://checkout.paystack.com/k818zvbawzsfec4"
}
```
### Get Endpoint
`/api/v1/payments/{id}`
- id: paymentReference

#### Response Body
```json
{
    "payment": {
        "id": "dx6q6p036l",
        "customer_name": "John Doe",
        "customer_email": "john@gmail.com",
        "amount": 50,
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
### Deployment
  Deployed on Render

### Project Structure
```arduino
src/
├── app.ts
├── server.ts
├── controller/
│   └── payment.ts
├── routes/
│   └── payment.ts
├── config/
│   └── paystack.ts
├── utils/
│   └── types.ts
tests/
│   └── payment.test.ts

```
### Environment Variable
```env
PORT=
PAYSTACK_SECRET_KEY=your_paystack_secret_key
```
