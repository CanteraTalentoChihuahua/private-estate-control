import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/users";
import queriesReport from "../models/reports";
import bcryptjs from "bcryptjs";

export const getUsers = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request().query(queriesReport.reportUsersHouses);

        res.status(200).json(result?.recordset);

        // TODO: 403 Forbidden/unauthorized

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

export const createUser = async (req: any, res: any) => {
    const { idResDev, firstName, lastName, phoneNumber, email, password, active = 1, faceId } = req.body;

    if (idResDev == null || firstName == null || lastName == null || email == null || password == null) {
        console.log("User not created");
        return res.status(400).json({ msg: 'Bad request. Missing some of these fields: IdResDev, FirstName, LastName, Email, Password' });
    }

    if (phoneNumber == null) {
        let phoneNumber = "";
    }
    if (faceId == null) {
        let faceId = "";
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
            .input('faceId', sql.VarChar, faceId)
            .query(queries.createNewUser);

        return res.status(201).json({ idResDev, firstName, lastName, phoneNumber, 
            email, password, active, faceId });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getUserById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', id)
        .query(queries.getUserById);

        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }

    //  TODO: Http responses => 403 forbidden; 404 not found
}

export const deleteUserById = async (req: any, res: any) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', id)
        .query(queries.deleteUser);
    
        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
        
    }

    // TODO: Same http responses as in get by id
}

export const getTotalUsers = async (req: any, res: any) => {
    const pool = await getConnection();
    const result = await pool?.request()
    .query(queries.getTotalUsers);

    res.json(result?.recordset[0]['']);

    //TODO: Maybe not to be kept
}

export const updateUserById = async (req: any, res: any) => {
    const { idResDev, firstName, lastName, phoneNumber, email, password, active, faceId } = req.body;
    const { id } = req.params;

    try {
        const pool = await getConnection()
        await pool?.request()
        .input('idResDev', sql.Int, idResDev)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('phoneNumber', sql.VarChar, phoneNumber)
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, bcryptjs.hashSync(password))
        .input('active', sql.Bit, active)
        .input('faceId', sql.VarChar, faceId)
        .input('id', sql.Int, id)
        .query(queries.updateUsersById)
    
        res.status(200).json({ idResDev, firstName, lastName, phoneNumber, email, password, active, faceId });
        
    } catch (error) {
        res.status(500).send(error);
    }

    // TODO: same http responses as previous todo mentioned

}