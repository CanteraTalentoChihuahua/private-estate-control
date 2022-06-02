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
exports.getConnection = void 0;
const mssql_1 = __importDefault(require("mssql"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//import dotenv from '../../config';
//const dotenv = require('dotenv');
const connectionString = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    // server: '50.21.186.23',
    server: process.env.SERVER,
    // port: process.env.PORT,
    port: 1433,
    database: process.env.DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: false // True when local dev
    }
};
function getConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const pool = yield mssql_1.default.connect(connectionString);
            return pool;
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.getConnection = getConnection;
