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
exports.updateUserById = exports.getTotalUsers = exports.deleteUserById = exports.getUserById = exports.createUser = exports.getUsers = void 0;
const db_1 = require("../conf/db");
const mssql_1 = __importDefault(require("mssql"));
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield (pool === null || pool === void 0 ? void 0 : pool.request().query(user_1.default.getAllUsers));
        res.json(result === null || result === void 0 ? void 0 : result.recordset);
    }
    catch (error) {
        res.status(500); // Internal server error
        res.send(error);
    }
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, info } = req.body;
    if (firstName == null || lastName == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields' });
    }
    if (info == null) {
        let info = "";
    }
    try {
        const pool = yield (0, db_1.getConnection)();
        const result = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('firstName', mssql_1.default.VarChar, firstName).input('lastName', mssql_1.default.VarChar, lastName).input('password', mssql_1.default.VarChar, password).input('info', mssql_1.default.VarChar, info).query(user_1.default.createNewUser));
        // "browser nav - type - name in db"
        //console.log(result);
        // NO DEBERIA MOSTRAR EL PASSWORD, SOLO ES PARA TESTEAR XD
        return res.status(200).json({ firstName, lastName, password, info });
    }
    catch (error) {
        res.status(500);
        res.send(error);
    }
});
exports.createUser = createUser;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pool = yield (0, db_1.getConnection)();
    const result = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('Id', id).query(user_1.default.getUserById));
    res.send(result === null || result === void 0 ? void 0 : result.recordset[0]);
});
exports.getUserById = getUserById;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const pool = yield (0, db_1.getConnection)();
    const result = yield (pool === null || pool === void 0 ? void 0 : pool.request().input('Id', id).query(user_1.default.deleteUser));
    res.sendStatus(204); // All fine
});
exports.deleteUserById = deleteUserById;
const getTotalUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pool = yield (0, db_1.getConnection)();
    const result = yield (pool === null || pool === void 0 ? void 0 : pool.request().query(user_1.default.getTotalUsers));
    res.json(result === null || result === void 0 ? void 0 : result.recordset[0]['']); // All fine
});
exports.getTotalUsers = getTotalUsers;
const updateUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, password, info } = req.body;
    const { id } = req.params;
    if (firstName == null || lastName == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields' });
    }
    const pool = yield (0, db_1.getConnection)();
    yield (pool === null || pool === void 0 ? void 0 : pool.request().input('firstName', mssql_1.default.VarChar, firstName).input('lastName', mssql_1.default.VarChar, lastName).input('password', mssql_1.default.VarChar, password).input('info', mssql_1.default.VarChar, info).input('Id', mssql_1.default.Int, id).query(user_1.default.updateUsersById));
    res.json({ firstName, lastName, password, info });
});
exports.updateUserById = updateUserById;
