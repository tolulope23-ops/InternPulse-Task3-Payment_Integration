import request from 'supertest';
import app from '../src/app'; // your Express app
import * as paystack from '../src/config/paystack'; // mock this

jest.mock('../src/config/paystack'); // Automatically mocks the Paystack instance

describe('Payment API', () => {
  const mockPost = paystack.default.post as jest.Mock;
  const mockGet = paystack.default.get as jest.Mock;

  let mockReferenceId = 'ref_abc123';

  beforeEach(() => {
    jest.clearAllMocks();
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
    expect(response.body).toHaveProperty('message', 'Payment initialised successfully');
    expect(response.body).toHaveProperty('paymentId', mockReferenceId);
    expect(response.body).toHaveProperty('payment_URL', expect.stringContaining('https://'));
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

    mockGet.mockResolvedValue({
      data: {
        data: {
          status: 'success',
          amount: 5000 // in kobo
        }
      }
    });

    const getResponse = await request(app).get(`/api/v1/payments/${mockReferenceId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.body).toHaveProperty('status', 'success');
    expect(getResponse.body.payment).toMatchObject({
      id: mockReferenceId,
      customer_name: 'John Doe',
      customer_email: 'john@example.com',
      amount: 50,
      status: 'completed'
    });
  });

  it('should return 404 for invalid payment ID', async () => {
    const response = await request(app).get('/api/v1/payments/invalid-id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message', 'payment not found');
  });
});
