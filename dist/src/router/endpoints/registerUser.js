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
const express_validator_1 = require("express-validator");
const responce_status_1 = require("../../types/responce-status");
const log_1 = __importDefault(require("../../utils/log"));
const config_1 = __importDefault(require("config"));
const registerUserRouter = (0, express_1.Router)();
registerUserRouter.post('', [
    (0, express_validator_1.body)('user.name', 'bad user name')
        .trim()
        .isAlphanumeric()
        .isLength({ min: 2, max: 15 })
        .isString(),
    (0, express_validator_1.body)('user.lastName', 'bad  lastname')
        .isLength({ max: 15 })
        .isString(),
    (0, express_validator_1.body)('user._id', 'bad user id')
        .trim()
        .isString(),
    (0, express_validator_1.body)('user.avatar_url', 'bad avatar url')
        .trim()
        .isString()
        .isURL({ require_host: false, require_port: false, require_protocol: false }),
    (0, express_validator_1.body)('user.avatar_min_url', 'bad avatar min url')
        .trim()
        .isString()
        .isURL({ require_host: false, require_port: false, require_protocol: false }),
    (0, express_validator_1.body)('user.email', 'bad email')
        .trim()
        .isEmail(),
    (0, express_validator_1.body)('user', 'bad user')
        .isObject(),
    (0, express_validator_1.body)('password', 'bad password')
        .trim()
        .isString()
        .isAlphanumeric()
        .isLength({ min: 5, max: 15 })
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const log = new log_1.default('Route: /api/users/registerUser');
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        ///// Validating request params
        if (!errors.isEmpty()) {
            return res.status(responce_status_1.ResponceStatus.BadRequest).json({
                message: "Incorect User credentials",
                predicate: "INCORRECT",
                errors: errors.array(),
            });
        }
        const database = req.database;
        const { user, password } = req.body;
        //Make request to authentication service to register user
        let authResponse;
        const authData = yield fetch(config_1.default.get("register_url"), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: user.email,
                password: password,
            })
        })
            .then(response => {
            authResponse = response;
            return response.json();
        })
            .then(data => {
            if (authResponse.status === 200) {
                user._id = data.userId;
            }
            else {
                user._id = "";
            }
            return data;
        })
            .catch(err => {
            log.error(`Error ${err === null || err === void 0 ? void 0 : err.message}`);
            return res.status(responce_status_1.ResponceStatus.ServerError).json({
                message: `Server error ${err === null || err === void 0 ? void 0 : err.message}`,
            });
        });
        if (user._id.length < 24) {
            return res.status(authResponse.status).json(authData);
        }
        log.info(`User id: ${user._id}`);
        //Check if user already exists
        const userExist = yield database.getUser(user._id);
        if (userExist) {
            return res.status(responce_status_1.ResponceStatus.StorageError).json({
                message: 'User already exist',
                predicate: 'EXIST'
            });
        }
        //Save user
        const _id = yield database.addUser(user);
        log.info('User saved');
        return res.status(responce_status_1.ResponceStatus.Success).json({
            _id
        });
    }
    catch (e) {
        log.error(`Error ${e === null || e === void 0 ? void 0 : e.message}`);
        return res.status(responce_status_1.ResponceStatus.ServerError).json({
            message: `Server error ${e === null || e === void 0 ? void 0 : e.message}`,
        });
    }
}));
exports.default = registerUserRouter;
