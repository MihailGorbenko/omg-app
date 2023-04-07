"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const responce_status_1 = require("../../types/responce-status");
const testRouter = (0, express_1.Router)();
testRouter.post('', [
    (0, auth_1.default)()
], (req, res) => {
    return res
        .status(responce_status_1.ResponceStatus.Success)
        .json({
        userId: req.userId
    })
        .send(`User id: ${req.userId}`);
});
exports.default = testRouter;
