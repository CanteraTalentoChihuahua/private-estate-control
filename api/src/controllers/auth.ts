import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import { generateAccessToken } from "../middlewares/jwt";
import { count } from "console";

export const testGet = async (req: any, res: any) => {

    //res.send(usrs);
    res.json({ email: req.email, password: req.password }); // El username que guardamos
}

export const getLogin = async (req: any, res: any) => {
    res.send(`
        <html>
            <body>
                <form method="POST" action="/api/login/auth">
                Email: <input type="text" name="email" id="email"><br>
                Password: <input type="password" name="password" id="password"><br>
                <input type="submit" value="Log in">
                </form>
            </body>
        </html>
    `);
}

export const authLogin = async (req: any, res: any) => {
    const { email } = req.body;
    const { password } = req.body;

    //consulta y validacion
    const user = { email: email, password: password }; // se puede guardar cualquier tipo de dato
    const accessToken = generateAccessToken(user);

    const pool = await getConnection();

    const result = await pool?.request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .query(queries.matchUser);

    var verified = "???";

    console.log(result);
    console.log(typeof (result));

    if ((result?.recordset)?.length) {
        verified = "Verified";
    } else {
        verified = "imposter";
    }

    res.header('authorization', accessToken).json({
        message: 'Auth completed',
        token: accessToken,
        email: user.email,
        password: user.password,
        verified: verified
    });
}