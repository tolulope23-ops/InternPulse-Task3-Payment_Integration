import { Router } from "express";
import { initiate_payment, verify_payment } from "../controller/payment";
import { paymentRateLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/payments", paymentRateLimiter, initiate_payment);
router.get("/payments/:id", verify_payment);

export default router;