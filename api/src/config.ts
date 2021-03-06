import path from "path";
import dotenv from "dotenv";

// Parsing the env file.
//C:\Users\almef\OneDrive\Escritorio\private-estate-control\api\src\config.ts
dotenv.config({ path: path.resolve("../.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

interface ENV {
    NODE_ENV: String | undefined;
    PORT: Number | undefined;
    USER: String | undefined;
    PASSWORD: String | undefined;
    DBPORT: Number | undefined;
    SERVER: String | undefined;
    DATABASE: String | undefined;
}

interface Config {
    NODE_ENV: String;
    PORT: Number;
    USER: String;
    PASSWORD: String;
    DBPORT: Number;
    SERVER: String;
    DATABASE: String;
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        NODE_ENV: process.env.NODE_ENV,
        PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
        USER: process.env.USER ? String(process.env.USER) : undefined,
        PASSWORD: process.env.PASSWORD ? String(process.env.SVPORPASSWORDT) : undefined,
        DBPORT: process.env.DBPORT ? Number(process.env.DBPORT) : undefined,
        SERVER: process.env.SERVER ? String(process.env.SERVER) : undefined,
        DATABASE: process.env.DATABASE ? String(process.env.DATABASE) : undefined
    };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
