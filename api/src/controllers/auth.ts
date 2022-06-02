import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import jwt from "jsonwebtoken";

export const testGet = async (req: any, res: any) => {
    let usrs = {
        "items": [
            { "id": 1, "name": "TestName1" },
            { "id": 2, "name": "TestName2" }
        ]
    }
    res.send(usrs);
    res.json({username: req.user}); // El username que guardamos
}

export const getLogin = async (req: any, res: any) => {
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
}


function generateAccessToken(user: any){
    return jwt.sign(user, process.env.SECRET || "secret"); // , { expiresIn: '5m'}
}

export function validateToken(req: any, res: any, next: any){
    const accessToken = req.headers['authorization'] || req.query.accessToken; // Lo busca || puede ir en browser
    console.log(accessToken);
    if (!accessToken) res.send('Access denied'); // NO token = no acceso

    jwt.verify(accessToken, process.env.SECRET || "secret", (err: any, user: any) => {
        if (err) {
            res.send('Access denied, token expired or incorrect');
        } else {
            req.user = user; // En node guardamos user
            next();
        }
    });
}

export const authLogin = async (req: any, res: any) => {
    const {username, password} = req.body;
    //consulta y validacion - mañana xD
    const user = {username: username}; // se puede guardar cualquier tipo de dato
    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        message: 'User auth completed',
        token: accessToken
    });
}