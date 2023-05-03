"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const appRouter_1 = __importDefault(require("./router/appRouter"));
const attachDatabase_1 = __importDefault(require("./middleware/attachDatabase"));
const cors_1 = __importDefault(require("cors"));
const express_csp_header_1 = require("express-csp-header");
function createApp(db) {
    const app = (0, express_1.default)();
    if (process.env.NODE_ENV !== 'production') {
        app.use((0, cors_1.default)());
    }
    app.use((0, express_csp_header_1.expressCspHeader)({
        directives: {
            "default-src": [express_csp_header_1.SELF, 'https://auth.omgapp.pp.ua', 'https://fonts.googleapis.com'],
            "script-src": [express_csp_header_1.SELF, 'https://auth.omgapp.pp.ua']
        }
    }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../public/build')));
    app.use('/api/storage', express_1.default.static(path_1.default.resolve(__dirname, 'userData')));
    app.use((0, attachDatabase_1.default)(db));
    app.use('/', appRouter_1.default);
    app.get('*', (req, res) => {
        res.sendFile(path_1.default.join(__dirname, '../public/build/index.html'));
    });
    return app;
}
exports.default = createApp;
