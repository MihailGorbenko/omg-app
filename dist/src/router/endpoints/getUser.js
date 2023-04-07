"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("../../middleware/auth"));
const responce_status_1 = require("../../types/responce-status");
const log_1 = __importDefault(require("../../utils/log"));
const getUserRouter = (0, express_1.Router)();
getUserRouter.get('', [(0, auth_1.default)()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const log = new log_1.default('Route: /api/users/getUser');
    try {
        const user = yield req.database.getUser(req.userId);
        if (!user) {
            return res.status(responce_status_1.ResponceStatus.NotAuthorized).json({
                message: 'User not found',
                predicate: 'NOT_EXIST'
            });
        }
        return res.status(responce_status_1.ResponceStatus.Success).json({
            user: {
                _id: user.id,
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                avatar_url: user.avatar_url,
                avatar_min_url: user.avatar_min_url
            }
        });
    }
    catch (e) {
        log.error(`Error ${e === null || e === void 0 ? void 0 : e.message}`);
        return res.status(responce_status_1.ResponceStatus.ServerError).json({
            message: `Server error ${e === null || e === void 0 ? void 0 : e.message}`,
        });
    }
}));
exports.default = getUserRouter;
