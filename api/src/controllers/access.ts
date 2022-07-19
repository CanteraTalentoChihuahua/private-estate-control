import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/access"

export const getEntrances = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.joinAccess);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}