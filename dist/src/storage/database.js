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
exports.Database = void 0;
const config_1 = __importDefault(require("config"));
const mongoose_1 = __importDefault(require("mongoose"));
const log_1 = __importDefault(require("../utils/log"));
class DB {
}
exports.default = DB;
class Database extends DB {
    constructor() {
        super();
        this.connection = null;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const log = new log_1.default("Database");
            mongoose_1.default.set('strictQuery', false);
            mongoose_1.default.connection.on('error', (err) => log.error(err));
            mongoose_1.default.connection.once('open', () => log.info('Mongo DB connection successfull'));
            this.connection = mongoose_1.default.connection;
            yield mongoose_1.default.connect(config_1.default.get('mongo_uri'));
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connection) {
                yield this.connection.close();
                this.connection = null;
            }
        });
    }
}
exports.Database = Database;
