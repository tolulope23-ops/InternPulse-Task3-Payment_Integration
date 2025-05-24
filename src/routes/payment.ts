import { Router } from "express";
import { transaction, displayTransaction } from "../controller/payment";
import { paymentRateLimiter } from "../middleware/rateLimit";

const router = Router();

router.post("/payments", paymentRateLimiter, transaction);
router.get("/payments/:id", displayTransaction);

export default router;