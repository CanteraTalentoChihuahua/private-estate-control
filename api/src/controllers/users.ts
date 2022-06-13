import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/users"
import bcryptjs from "bcryptjs"
import { faceId } from "./facerecognition";

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

    const { idResDev, firstName, lastName, phoneNumber, email, password, active, faceId } = req.body;
    const { id } = req.params;


    if (email == null || password == null) {
        console.log("User not updated");
        return res.status(400).json({ msg: 'Bad request. Fill required fields' });
    }

    const pool = await getConnection()
    await pool?.request()
        .input('idResDev', sql.VarChar, idResDev)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('phoneNumber', sql.VarChar, phoneNumber)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, password)
        .input('active', sql.VarChar, active)
        .input('faceId', sql.VarChar, faceId) //might be erased because now may be another table for the id with luxand
        .input('Id', sql.Int, id)
        .query(queries.updateUsersById)

    res.json({ idResDev, firstName, lastName, phoneNumber, email, password, active, faceId, id });

}