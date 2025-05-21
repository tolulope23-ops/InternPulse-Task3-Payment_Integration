import { Router } from "express";
import { transaction } from "../controller/payment";

const router = Router();

router.post("/payment", transaction);

export default router;