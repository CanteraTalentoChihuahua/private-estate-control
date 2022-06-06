import sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

const connectionString = {
    user: "sa",
    password: "FraccionamientoBootcamp*1",
    server: "50.21.186.23",
    port: 1433,
    database: "ResDevDB",
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
