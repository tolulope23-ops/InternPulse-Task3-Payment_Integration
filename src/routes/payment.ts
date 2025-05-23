import { Router } from "express";
import { transaction, displayTransaction } from "../controller/payment";

const router = Router();

router.post("/payments", transaction);
router.get("/payments/:id", displayTransaction);

export default router;