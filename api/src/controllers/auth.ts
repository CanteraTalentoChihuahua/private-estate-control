import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import { generateAccessToken } from "../middlewares/jwt";
import bcryptjs from "bcryptjs"
import { NextFunction } from "express";

export let readRole: string;

export const testGet = async (req: any, res: any) => {

    try {

        res.json({ email: req.email, password: req.password });
        
    } catch (error) {
        res.status(500);
        return res.send("An error occurred: " + error);
    }

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
    let message;

    const user = { email: email, password: password };

    try {
        const pool = await getConnection();

        const role = await pool?.request()
        .input('email', sql.VarChar, email)
        .query(queries.getRole);

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

        switch (role?.recordset[0].Role) {
            case 1:
                readRole = "Super Administrator"
                break;
            case 2:
                readRole = "Administrator"
                break;
            case 3:
                readRole = "Regular User"
                break;
            default:
                readRole = "Not A Role"
                break;
        }

        const bearer = generateAccessToken(user);

        console.log("Current logged user role: " + readRole);

        return res.json({salute: message = bearer});

    } catch (error) {
        res.status(406);
        return res.send("An error occurred: " + error);
    }

}