import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/residentials"

export const createRes = async (req: any, res: any) => {

    const { Name, Description } = req.body;

    if (Name == null) {
        console.log("Residential not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Name)' });
    }

    if (Description == null) {
        let Description = "";
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('Name', sql.VarChar, Name)
            .input('Description', sql.VarChar, Description)
            .query(queries.createRes);

        return res.status(200).json({ Name, Description });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getallRes = async (req: any, res: any) => {
    try {

        const pool = await getConnection();
        const result = await pool?.request().query(queries.getallRes);

        res.json(result?.recordset);

    } catch (error) {
        res.status(500); // Internal server error
        res.send(error);
    }
}

export const getResById = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('IdResDev', id)
        .query(queries.getResById);

    res.send(result?.recordset[0]);
}

export const updateRes = async (req: any, res: any) => {

    const { Name, Description } = req.body;
    const { id } = req.params;


    if (Name == null) {
        console.log("Residential not updated");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Name)' });
    }

    const pool = await getConnection()
    await pool?.request()
        .input('Name', sql.VarChar, Name)
        .input('Description', sql.VarChar, Description)
        .input('Id', sql.Int, id)
        .query(queries.updateRes)

    res.json({ id, Name });

}

export const deleteRes = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('Id', id)
        .query(queries.deleteRes);

    res.sendStatus(204); // All fine
}