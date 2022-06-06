import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/userstests"

export const getUsers = async (req: any, res: any) => {
    try {

        const pool = await getConnection();
        const result = await pool?.request().query(queries.getAllUsers);

        res.json(result?.recordset);

    } catch (error) {
        res.status(500); // Internal server error
        res.send(error);
    }
}

export const createUser = async (req: any, res: any) => {

    const { firstName, lastName, password, info } = req.body;

    if (firstName == null || lastName == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields' });
    }

    if (info == null) {
        let info = "";
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('password', sql.VarChar, password)
            .input('info', sql.VarChar, info)
            .query(queries.createNewUser);
        // "browser nav - type - name in db"

        //console.log(result);

        // NO DEBERIA MOSTRAR EL PASSWORD, SOLO ES PARA TESTEAR XD
        return res.status(200).json({ firstName, lastName, password, info });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getUserById = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('Id', id)
        .query(queries.getUserById);

    res.send(result?.recordset[0]);
}

export const deleteUserById = async (req: any, res: any) => {
    const { id } = req.params;

    const pool = await getConnection();
    const result = await pool?.request()
        .input('Id', id)
        .query(queries.deleteUser);

    res.sendStatus(204); // All fine
}

export const getTotalUsers = async (req: any, res: any) => {

    const pool = await getConnection();
    const result = await pool?.request()
        .query(queries.getTotalUsers);

    res.json(result?.recordset[0]['']); // All fine
}

export const updateUserById = async (req: any, res: any) => {

    const { firstName, lastName, password, info } = req.body;
    const { id } = req.params;


    if (firstName == null || lastName == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields' });
    }

    const pool = await getConnection()
    await pool?.request()
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('password', sql.VarChar, password)
        .input('info', sql.VarChar, info)
        .input('Id', sql.Int, id)
        .query(queries.updateUsersById)

    res.json({ firstName, lastName, password, info });

}