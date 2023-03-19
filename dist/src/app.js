"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const path_1 = __importDefault(require("path"));
const appRouter_1 = __importDefault(require("./router/appRouter"));
const attachDatabase_1 = __importDefault(require("./middleware/attachDatabase"));
function createApp(db) {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use((0, helmet_1.default)());
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../frontend/build')));
    app.use((0, attachDatabase_1.default)(db));
    app.use('/', appRouter_1.default);
    app.get('/:universalURL', (req, res) => {
        res.send('404 URL NOT FOUND');
    });
    return app;
}
exports.default = createApp;
