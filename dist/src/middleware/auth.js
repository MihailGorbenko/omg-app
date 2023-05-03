"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const responce_status_1 = require("../types/responce-status");
const config_1 = __importDefault(require("config"));
function jwtAuth() {
    return function (req, res, next) {
        var _a;
        if (req.method === 'OPTIONS')
            return next();
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; //Bearer TOKEN
        console.log(token);
        if (!token) {
            return res.status(responce_status_1.ResponceStatus.BadRequest).json({
                message: 'Access token required'
            });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.get('jwt_secret'));
            if (!decoded.id) {
                return res.status(responce_status_1.ResponceStatus.BadRequest).json({
                    message: 'Access token missing userId',
                    predicate: 'BAD_TOKEN'
                });
            }
            req.userId = decoded.id;
        }
        catch (err) {
            return res.status(responce_status_1.ResponceStatus.NotAuthorized).json({
                message: 'Access token invalid or expired',
                predicate: 'EXPIRED'
            });
        }
        next();
    };
}
exports.default = jwtAuth;
