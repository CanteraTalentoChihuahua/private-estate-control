import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/houses"

export const createHouse = async (req: any, res: any) => {
    const { address, idResDev } = req.body;

    if (address == null || idResDev == null) {
        console.log("House not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Address, IdResDev)' });
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('address', sql.VarChar, address)
            .input('occuppied', sql.Bit, 0)
            .input('balance', sql.Float, 0)
            .input('idResDev', sql.Int, idResDev)
            .query(queries.createHouse);

        return res.status(200).json({ address, idResDev });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getHouses = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllHouses);

        res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const getHouseById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.getHouseById);
    
        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }

}

export const updateHouseById = async (req: any, res: any) => {
    const { address, idResDev, occuppied, balance } = req.body;
    const { id } = req.params;

    if (address == null) {
        console.log("House not updated");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Address)' });
    }

    try {
        const pool = await getConnection()
        await pool?.request()
            .input('address', sql.VarChar, address)
            .input('occuppied', sql.Bit, occuppied)
            .input('balance', sql.Float, balance)
            .input('idResDev', sql.Int, idResDev)
            .input('id', sql.Int, id)
            .query(queries.updateHouse)
    
        res.status(200).json({ id, address, idResDev });    

    } catch (error) {
        res.status(500).send(error);
    }

}

export const deleteHouseById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('id', id)
            .query(queries.deleteHouse);
    
        res.sendStatus(200);   

    } catch (error) {
        res.status(500).send(error);
    }

}