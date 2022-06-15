import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const connectionString = {

    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    port: Number(process.env.DBPORT),
    database: process.env.DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: false // True when local dev
    }
}

export async function getConnection() {
    try {
        const pool = await sql.connect(connectionString);
        return pool;
    } catch (error) {
        console.log(error);
    }

}
