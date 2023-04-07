"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    avatar_url: { type: String, required: true },
    avatar_min_url: { type: String, required: true },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
