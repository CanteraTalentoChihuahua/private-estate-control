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
exports.authLogin = exports.validateToken = exports.getLogin = exports.testGet = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const testGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let usrs = {
        "items": [
            { "id": 1, "name": "TestName1" },
            { "id": 2, "name": "TestName2" }
        ]
    };
    res.send(usrs);
    res.json({ username: req.user }); // El username que guardamos
});
exports.testGet = testGet;
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(`
        <html>
            <body>
                <form method="POST" action="/api/login/auth">
                Username: <input type="text" name="text"><br>
                Pass: <input type="password" name="password"><br>
                <input type="submit" value="Log in">
                </form>
            </body>
        </html>
    `);
});
exports.getLogin = getLogin;
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.SECRET || "secret"); // , { expiresIn: '5m'}
}
function validateToken(req, res, next) {
    const accessToken = req.headers['authorization'] || req.query.accessToken; // Lo busca || puede ir en browser
    console.log(accessToken);
    if (!accessToken)
        res.send('Access denied'); // NO token = no acceso
    jsonwebtoken_1.default.verify(accessToken, process.env.SECRET || "secret", (err, user) => {
        if (err) {
            res.send('Access denied, token expired or incorrect');
        }
        else {
            req.user = user; // En node guardamos user
            next();
        }
    });
}
exports.validateToken = validateToken;
const authLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    //consulta y validacion - mañana xD
    const user = { username: username }; // se puede guardar cualquier tipo de dato
    const accessToken = generateAccessToken(user);
    res.header('authorization', accessToken).json({
        message: 'User auth completed',
        token: accessToken
    });
});
exports.authLogin = authLogin;
