import { getConnection } from '../conf/db';
import queriesReport from "../models/reports";

export const emailValidator = async (email = '') =>{

    const pool = await getConnection();
    const result = await pool?.request()
    .input('email', email)
    .query(queriesReport.emailVerification);

    if (!(result?.recordset.length == 0)) {
        throw new Error(`Este correo: ${email} ya se encuentra registrado`);
    }
}