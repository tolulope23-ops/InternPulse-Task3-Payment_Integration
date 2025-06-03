import request from 'supertest';
import app from '../src/app'; 
import * as paystack from '../src/config/paystack';
import { payment as paymentModel}  from '../src/model/payment';

jest.mock('../src/config/paystack'); // Mocks the Paystack service Api
 
// Mocks Payment model (Mongoose)
const saveMock = jest.fn().mockResolvedValue({});
const findOneMock = jest.fn();

jest.mock('../src/model/payment', () => {
  return {
    payment: jest.fn().mockImplementation(() => ({
      save: saveMock
    })),
  };
});

describe('Payment API', () => {
  const mockPost = paystack.default.post as jest.Mock;
  const mockGet = paystack.default.get as jest.Mock;
  let mockReferenceId = 'ref_abc123';

  beforeEach(() => {
    jest.clearAllMocks();
    (paymentModel as any).findOne = findOneMock;
  });

  it('should initiate a payment', async () => {
    mockPost.mockResolvedValue({
      data: {
        data: {
          reference: mockReferenceId,
          authorization_url: 'https://paystack.com/pay/mockauth'
        }
      }
    });
  
    const response = await request(app)
      .post('/api/v1/payments')
      .send({
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        amount: 50
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Payment initialised successfully');
    expect(response.body).toHaveProperty('reference', mockReferenceId);
    expect(response.body).toHaveProperty('payment_URL', expect.stringContaining('https://'));
    expect(saveMock).toHaveBeenCalled();
  });

  it('should retrieve payment status by ID', async () => {
    // First, initiate a payment
    mockPost.mockResolvedValue({
      data: {
        data: {
          reference: mockReferenceId,
          authorization_url: 'https://paystack.com/pay/mockauth'
        }
      }
    });

    await request(app)
      .post('/api/v1/payments')
      .send({
        customer_name: 'John Doe',
        customer_email: 'john@example.com',
        amount: 50
      });

//Mock findOne to return a mock payment
    const mockPaymentData = {
      reference: mockReferenceId,
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      amount: 50,
      payment_status: 'pending',
      payment_date: new Date().toISOString(),
      save: jest.fn().mockResolvedValue({}) // mock .save()
    };

    findOneMock.mockResolvedValue(mockPaymentData);

    // Step 3: Mock verifyPayment
    mockGet.mockResolvedValue({
      data: {
        data: {
          status: 'success',
          currency: 'NGN',
          amount: 5000
        }
      }
    });

    const response = await request(app).get(`/api/v1/payments/${mockReferenceId}`);

    expect(response.status).toBe(200);
    expect(response.body.payment).toMatchObject({
      reference: mockReferenceId,
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      amount: 50,
      payment_status: 'success',
    });
    expect(response.body.payment).toHaveProperty('payment_date');
    expect(new Date(response.body.payment.payment_date).toString()).not.toBe('Invalid Date');
    
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'Payment details retrieved successfully.');
  });

  it('should return 404 for invalid payment ID', async () => {
   findOneMock.mockResolvedValue(null);

    const response = await request(app).get('/api/v1/payments/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'Payment not found');
  });
});
