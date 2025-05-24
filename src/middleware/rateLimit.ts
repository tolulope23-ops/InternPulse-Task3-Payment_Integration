import rateLimit from 'express-rate-limit';

export const paymentRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 15, 
  message: {
    status: 'error',
    message: 'Too many payment requests, please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
