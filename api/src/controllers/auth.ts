import { getConnection } from "../conf/db";
import queries from "../models/auth"
import sql from "mssql";
import { generateAccessToken } from "../middlewares/jwt";
import bcryptjs from "bcryptjs"
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
        .query(queries.matchUser);

    var verified = "???";

    const noemails = (result?.recordset)?.length;

    if (!noemails) {
        //make it return that the user does not exists (400?)
        verified = "Imposter";
    }

    for (let i = 0; i <= Number(noemails) - 1; i++) {
        const { Password } = result?.recordset[i];
        if ((bcryptjs.compareSync(user.password, Password))) {
            verified = "Verified";
            break;
            //make it so it goes to the dashboard of the user depending on the roles?
        }
        verified = "Sus"
    }

    /*if ((result?.recordset)?.length) {
        // console.log(result.recordset[0]);
        // console.log(bcryptjs.compareSync(user.password, Password));
        const { Password } = result.recordset[0];
        // console.log(Password)
        verified = "Verified";
    } else {
        verified = "Imposter";
    } */

    // bcrypt.hashSync('Pa$$w0rd');
    // bcrypt.compareSync('Pa$$w0rd', passwordHash);

    res.header('authorization', accessToken).json({
        message: 'Auth completed',
        token: accessToken,
        email: user.email,
        password: user.password,
        hash: bcryptjs.hashSync("password123"),
        verified: verified
    });
}