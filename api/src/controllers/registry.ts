import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/registry";

export const getRegistry = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', id)
        .query(queries.getShownInfo);

        res.status(200).json(result?.recordset[0]);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const getBasedOnHouse = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', id)
        .query(queries.getUserBasedOnHouse);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}