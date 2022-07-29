import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/incomes"
import { request } from "http";

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

export const createIncome = async (req: any, res: any) => {
    const { idResDev, idHouse, amount, description } = req.body;

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

    if (idResDev == null || idHouse == null || amount == null) {
        console.log('Bad request. Missing some of these fields: IdResDev, IdHouse or Amount');
    }

    if (description == null) {
        let description = "";
    }

    try {
        const fname = `${req.body.prefix}_${req.body.filename}`;
        const pool = await getConnection();

        let fullname = req.body.prefix + "_" + req.body.imgName;

        const resbalhouse = await pool?.request()
            .input('idHouse', sql.Int, idHouse)
            .query(queries.getHouseIncome);

        if (Number(resbalhouse?.recordset[0].Balance) < Number(0)) {

            const result = await pool?.request()
                .input('idResDev', sql.Int, idResDev)
                .input('idHouse', sql.Int, idHouse)
                .input('date', sql.Date, date)
                .input('amount', sql.Float, amount)
                .input('description', sql.VarChar, description)
                .input('receipt', sql.VarChar, fname)
                .query(queries.createNewIncome);

            const newbal = Number(resbalhouse?.recordset[0].Balance) + Number(amount);

            const newbalhouse = pool?.request()
                .input('id', sql.Int, idHouse)
                .input('balance', sql.Float, newbal)
                .query(queries.updateHouseBal);

            const balres = pool?.request()
                .input('id', sql.Int, idResDev)
                .query(queries.getResBal);

            if (Number(newbal) > 0) {
                const newbalresidential = Number((await balres)?.recordset[0].TotalBalance) + Number(amount) - Number(newbal);
                const newbalres = pool?.request()
                    .input('id', sql.Int, idResDev)
                    .input('totalBalance', sql.Float, newbalresidential)
                    .query(queries.updateResBal);
            }
            else {
                const newbalresidential = Number((await balres)?.recordset[0].TotalBalance) + Number(amount);
                const newbalres = pool?.request()
                    .input('id', sql.Int, idResDev)
                    .input('totalBalance', sql.Float, newbalresidential)
                    .query(queries.updateResBal);
            }

            res.status(200).send("Jala al 100");
            return;
        }

        const result = await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('idHouse', sql.Int, idHouse)
            .input('date', sql.Date, date)
            .input('amount', sql.Float, amount)
            .input('description', sql.VarChar, description)
            .input('receipt', sql.VarChar, fname)
            .query(queries.createNewIncome);

        const resultbal = await pool?.request()
            .input('id', sql.Int, idHouse)
            .query(queries.getABalance);

        const newbal = Number(resultbal?.recordset[0].Balance) + Number(amount);

        const resultupd = await pool?.request()
            .input('balance', sql.Float, newbal)
            .input('id', sql.Int, idHouse)
            .query(queries.updateHouseBal);

        res.status(200).send("Todo bien");

    } catch (error) {
        console.log(error);
        res.send(error);
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
            .input('receipt', sql.VarChar, receipt)
            .input('id', sql.Int, id)
            .query(queries.updateIncomesById)

        res.status(200).json({ idResDev, idHouse, date, amount, description, receipt });

    } catch (error) {
        res.status(500).send(error);
    }

}