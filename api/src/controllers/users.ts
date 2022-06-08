import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/users"
import bcryptjs from "bcryptjs"

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

    const { idResDev, firstName, lastName, phoneNumber, email, password, active = 1, facialId } = req.body;

    if (idResDev == null || firstName == null || lastName == null || email == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Fill required fields (IdResDev, FirstName, LastName, Email, Password)' });
    }

    if (phoneNumber == null) {
        let phoneNumber = "";
    }
    if (facialId == null) {
        let facialId = "";
    }

    try {
        const pool = await getConnection();

        const result = await pool?.request()
            .input('idResDev', sql.Int, idResDev)
            .input('firstName', sql.VarChar, firstName)
            .input('lastName', sql.VarChar, lastName)
            .input('phoneNumber', sql.VarChar, phoneNumber)
            .input('email', sql.VarChar, email)
            .input('password', sql.VarChar, bcryptjs.hashSync(password))
            .input('active', sql.Bit, active)
            .input('facialId', sql.VarChar, facialId)
            .query(queries.createNewUser);

        return res.status(200).json({ idResDev, firstName, lastName, phoneNumber, email, password, active, facialId });

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