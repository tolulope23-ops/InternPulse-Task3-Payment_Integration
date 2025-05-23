"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controller/payment");
const router = (0, express_1.Router)();
router.post("/payments", payment_1.transaction);
router.get("/payments/:id", payment_1.displayTransaction);
exports.default = router;
