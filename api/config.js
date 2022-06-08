"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
// Parsing the env file.
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config/config.env") });
// Loading process.env as ENV interface
const getConfig = () => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        USER: process.env.USER ? String(process.env.USER) : undefined,
        PASSWORD: process.env.PASSWORD ? String(process.env.SVPORPASSWORDT) : undefined,
        SERVER: process.env.SERVER ? String(process.env.SERVER) : undefined,
        DBPORT: process.env.DBPORT ? Number(process.env.DBPORT) : undefined,
        DATABASE: process.env.DATABASE ? String(process.env.DATABASE) : undefined,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined
    };
};
// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.
const getSanitzedConfig = (config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config;
};
const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);
exports.default = sanitizedConfig;
