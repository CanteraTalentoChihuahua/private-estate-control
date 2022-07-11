import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/incomes"
import { upload } from "../middlewares/image";

export const getIncomes = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllIncomes);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const createIncome = async (req: any) => {
    const { idResDev, idHouse, amount, description } = req.body;

    // console.log(req);

    // const receipt = upload.single("image");
    // console.log(receipt);

    const d = new Date();

    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    console.log(idResDev + " " + idHouse + " " + amount);

    if (idResDev == null || idHouse == null || amount == null) {
        console.log("Income not created");
        // return res.status(400).json({ msg: 'Bad request. Missing some of these fields: IdResDev, IdHouse or Amount'});
        console.log('Bad request. Missing some of these fields: IdResDev, IdHouse or Amount');
    }

    if (description == null) {
        let description = "";
    }

    console.log(date);

    try {
        let receipt = null;
        const pool = await getConnection();

        const result = await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('idHouse', sql.Int, idHouse)
            .input('date', sql.Date, date)
            .input('amount', sql.Float, amount)
            .input('description', sql.VarChar, description)
            .input('receipt', sql.VarChar, receipt)
            .query(queries.createNewIncome);

        // return res.status(201).json({ idResDev, idHouse, date, amount, description, receipt });
        console.log("Todo bien");

    } catch (error) {
        // res.status(500);
        // res.send(error);
        console.log(error);
    }

}

export const getIncomeById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.getIncomeById);

        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }

}

export const deleteIncomeById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.deleteIncome);

        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error);

    }

}

export const updateIncomeById = async (req: any, res: any) => {
    const { idResDev, idHouse, date, amount, description, receipt } = req.body;
    const { id } = req.params;

    try {
        const pool = await getConnection()
        await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('idHouse', sql.Int, idHouse)
            .input('date', sql.Date, date)
            .input('amount', sql.Float, amount)
            .input('description', sql.VarChar, description)
            .input('receipt', sql.Binary, receipt)
            .input('id', sql.Int, id)
            .query(queries.updateIncomesById)

        res.status(200).json({ idResDev, idHouse, date, amount, description, receipt });

    } catch (error) {
        res.status(500).send(error);
    }

}