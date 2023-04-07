"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const registerUser_1 = __importDefault(require("./endpoints/registerUser"));
const getUser_1 = __importDefault(require("./endpoints/getUser"));
const test_1 = __importDefault(require("./endpoints/test"));
const appRouter = (0, express_1.Router)();
if (process.env.NODE_ENV === 'test') {
    appRouter.use('/test', test_1.default);
}
appRouter.use('/api/users/registerUser', registerUser_1.default);
appRouter.use('/api/users/getUser', getUser_1.default);
exports.default = appRouter;
