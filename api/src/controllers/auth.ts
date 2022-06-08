import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import { generateAccessToken } from "../middlewares/jwt";

export const testGet = async (req: any, res: any) => {

    //res.send(usrs);
    res.json({username: req.user}); // El username que guardamos
}

export const getLogin = async (req: any, res: any) => {
    res.send(`
        <html>
            <body>
                <form method="POST" action="/login/auth">
                Username: <input type="text" name="username" id="username"><br>
                Pass: <input type="password" name="password" id="password"><br>
                <input type="submit" value="Log in">
                </form>
            </body>
        </html>
    `);
}

export const authLogin = async (req: any, res: any) => {
    const {username} = req.body;
    //consulta y validacion
    const user = {username: username}; // se puede guardar cualquier tipo de dato
    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        message: 'User auth completed',
        token: accessToken
    });
}