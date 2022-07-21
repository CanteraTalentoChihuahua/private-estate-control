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
    const { idResDev, description, amount } = req.body;

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    if (idResDev == null || description == null || amount == null) {
        console.log("Outcome not created");
        console.log(req);
        return res.status(400).json({ msg: 'Bad request. Missing some of these fields: IdResDev, Description or Amount' });
    }

    try {

        const pool = await getConnection();

        const bal = await pool?.request()
            .query(queries.getAllBalances);

        if (Number(bal?.recordset[0]) < Number(amount)) {
            throw ("Not enough money to do this");
        }

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

export const getOutcomeById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.getOutcomeById);

        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }

}

export const deleteOutcomeById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.deleteOutcome);

        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error);

    }

}

export const updateOutcomeById = async (req: any, res: any) => {
    const { idResDev, description, date, amount } = req.body;
    const { id } = req.params;

    try {
        const pool = await getConnection()
        await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('description', sql.VarChar, description)
            .input('date', sql.Date, date)
            .input('amount', sql.Float, amount)
            .input('id', sql.Int, id)
            .query(queries.updateOutcomesById)

        res.status(200).json({ idResDev, description, date, amount });

    } catch (error) {
        res.status(500).send(error);
    }

}