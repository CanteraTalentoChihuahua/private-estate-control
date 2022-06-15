import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/houses"

export const createHouse = async (req: any, res: any) => {

    const { Address, idResDev } = req.body;

    if (Address == null || idResDev == null) {
        console.log("House not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Address, IdResDev)' });
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('Address', sql.VarChar, Address)
            .input('IdResDev', sql.Int, idResDev)
            .input('Occuppied', sql.Bit, 0)
            .input('Balance', sql.Float, 0)
            .query(queries.createHouse);

        return res.status(200).json({ Address, idResDev });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getHouses = async (req: any, res: any) => {
    try {

        const pool = await getConnection();
        const result = await pool?.request().query(queries.getHouses);

        res.json(result?.recordset);

    } catch (error) {
        res.status(500); // Internal server error
        res.send(error);
    }
}

export const getHouseById = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('Id', id)
        .query(queries.getHouseById);

    res.send(result?.recordset[0]);
}

export const updateHouse = async (req: any, res: any) => {

    const { address, idResDev, occupied, balance } = req.body;
    const { id } = req.params;


    if (address == null) {
        console.log("Residential not updated");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (Address)' });
    }

    const pool = await getConnection()
    await pool?.request()
        .input('Address', sql.VarChar, address)
        .input('IdResDev', sql.Int, idResDev)
        .input('Occuppied', sql.Bit, occupied)
        .input('Balance', sql.Float, balance)
        .input('Id', sql.Int, id)
        .query(queries.updateHouse)

    res.json({ id, address, idResDev });

}

export const deleteHouse = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('id', id)
        .query(queries.deleteHouse);

    res.sendStatus(204); // All fine
}