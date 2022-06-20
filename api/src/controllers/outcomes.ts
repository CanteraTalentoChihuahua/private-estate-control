import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/outcomes"

export const getOutcomes = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllOutcomes);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const createOutcome = async (req: any, res: any) => {
    const { idResDev, description, date, amount } = req.body;

    if (idResDev == null || description == null || date == null || amount == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Missing some of these fields: IdResDev, Description, Date or Amount' });
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('description', sql.VarChar, description)
            .input('date', sql.Date, date)
            .input('amount', sql.Float, amount)
            .query(queries.createNewOutcome);

        return res.status(201).json({ idResDev, description, date, amount });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}