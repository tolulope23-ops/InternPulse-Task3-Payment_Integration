"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentId = void 0;
const uuid_1 = require("uuid");
const paymentId = () => {
    const id = (0, uuid_1.v4)().substring(0, 12);
    return id;
};
exports.paymentId = paymentId;
;
