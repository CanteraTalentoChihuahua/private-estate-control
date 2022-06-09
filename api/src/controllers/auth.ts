import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import { generateAccessToken } from "../middlewares/jwt";
import bcryptjs from "bcryptjs"
import { count } from "console";
import { nextTick } from "process";
import { NextFunction } from "express";

export const testGet = async (req: any, res: any) => {

    //res.send(usrs);
    res.json({ email: req.email, password: req.password }); // El username que guardamos
}

export const getLogin = async (req: any, res: any) => {
    res.send(`
        <html>
            <body>
                <form method="POST" action="/login/auth">
                Email: <input type="text" name="email" id="email"><br>
                Password: <input type="password" name="password" id="password"><br>

                <input type="submit" value="Log in">
                </form>
            </body>
        </html>
    `);
}

export const authLogin = async (req: any, res: any, next: NextFunction) => {
    const { email } = req.body;
    const { password } = req.body;

    const user = { email: email, password: password };

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('email', sql.VarChar, email)
            .query(queries.matchUser);

        const noemails = (result?.recordset)?.length;

        if (!noemails) {
            res.status(401);
            return res.send("Error, the email is not valid");
        }

        const { Password } = result?.recordset[0];

        if (!(bcryptjs.compareSync(user.password, Password))) {
            res.status(401);
            return res.send("Error, the password is not valid");
        }

        next();

    } catch (error) {
        res.status(406);
        return res.send("An error occurred: " + error);
    }

    // res.header('authorization', accessToken).json({
    //     message: 'Auth completed',
    //     token: accessToken,
    //     email: user.email,
    //     password: user.password,
    // });
}