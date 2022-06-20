import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/outcomes"

export const getOutcomes = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllOutcomes);

        res.status(200).json(result?.recordset);

        // TODO: 403 Forbidden/unauthorized

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}