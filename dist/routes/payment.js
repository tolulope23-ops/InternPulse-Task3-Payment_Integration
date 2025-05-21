"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_1 = require("../controller/payment");
const router = (0, express_1.Router)();
router.post("/payment", payment_1.transaction);
exports.default = router;
