import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/residentials"

export const createRes = async (req: any, res: any) => {

    const { name, description } = req.body;

    if (name == null) {
        console.log("Residential not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Name)' });
    }

    if (description == null) {
        let Description = "";
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .query(queries.createRes);

        return res.status(201).json({ name, description });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getRes = async (req: any, res: any) => {
    
    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllRes);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const getResById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', sql.Int, id)
        .query(queries.getResById);

        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }
    
}

export const updateResById = async (req: any, res: any) => {
    const { name, description } = req.body;
    const { id } = req.params;

    if (name == null) {
        console.log("Residential not updated");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Name)' });
    }

    try {
        const pool = await getConnection()
        await pool?.request()
            .input('name', sql.VarChar, name)
            .input('description', sql.VarChar, description)
            .input('id', sql.Int, id)
            .query(queries.updateRes)
    
        res.status(200).json({ id, name });
        
    } catch (error) {
        
    }

}

export const deleteResById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', sql.Int, id)
        .query(queries.deleteRes);

        res.sendStatus(200);

    } catch (error) {
        res.status(500).send(error);        
    }
    
}