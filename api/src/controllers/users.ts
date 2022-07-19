import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/users";
import queriesReport from "../models/reports";
import bcryptjs from "bcryptjs";      
import { request, response } from "express";

export const getUsers = async (req = request, res = response) => {

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

export const createUser = async (req = request, res = response) => {
    const { idResDev, firstName, lastName, phoneNumber = "", email, password, active = 1, faceId = "", idHouse } = req.body;

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

        const allUsers = await pool?.request()
            .input('email', sql.VarChar, email)
            .query(queries.getUserByEmail);

        const link = await pool?.request()
            .input('idHouse', sql.Int, idHouse)
            .input('idUser', sql.Int, allUsers?.recordset[0].IdUser)
            .query(queriesReport.createUsersHousesRegister)
        
        return res.status(201).json({ idResDev, firstName, lastName, phoneNumber, 
            email, password, active, faceId });

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const getUserById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const result = await pool?.request()
        .input('id', id)
        .query(queries.getUserById);

        if ((result?.recordset.length == 0)) {
            return res.status(400).json({
                msg: `El usuario con el id: '${id}' no existe`
            });
        }

        res.status(200);
        res.send(result?.recordset[0]);

    } catch (error) {
        res.status(500).send(error);
    }

    //  TODO: Http responses => 403 forbidden; 404 not found
}

export const deleteUserById = async (req = request, res = response) => {
    const { id } = req.params;

    try {
        const pool = await getConnection();
        const relationship = await pool?.request()
        .input('id', sql.Int, id)
        .query(queriesReport.deleteUserHouse)

        const result = await pool?.request()
        .input('id', id)
        .query(queries.deleteUser);
    
        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
    }

    // TODO: Same http responses as in get by id
}

export const unlinkUserById = async (req = request, res = response) => {
    const { idUser } = req.params;
    const { idHouse } = req.body;

    try {
        const pool = await getConnection();
        const relationship = await pool?.request()
        .input('idUser', sql.Int, idUser)
        .input('idHouse', sql.Int, idHouse)
        .query(queries.unlinkUserHouse)

        if (relationship?.rowsAffected[0] == 0) {
            return res.status(500).send("No se pudo eliminar la relacion");
        }

        res.sendStatus(200);
        
    } catch (error) {
        res.status(500).send(error);
        
    }

    // TODO: Same http responses as in get by id
}

export const getTotalUsers = async (req = request, res = response) => {
    const pool = await getConnection();
    const result = await pool?.request()
    .query(queries.getTotalUsers);

    res.json(result?.recordset[0]['']);

    //TODO: Maybe not to be kept
}

export const updateUserById = async (req = request, res = response) => {
    const { idResDev, firstName, lastName, phoneNumber, active = true, faceId = ""} = req.body;
    const { id } = req.params;

    let index = 0;
    let c = 0

    try {
        const pool = await getConnection()
        await pool?.request()
        .input('idResDev', sql.Int, idResDev)
        .input('firstName', sql.VarChar, firstName)
        .input('lastName', sql.VarChar, lastName)
        .input('phoneNumber', sql.VarChar, phoneNumber)
        //.input('password', sql.VarChar, bcryptjs.hashSync(password))
        .input('active', sql.Bit, active)
        .input('faceId', sql.VarChar, faceId)
        .input('id', sql.Int, id)
        .query(queries.updateUsersById)

        res.status(200).json({ id, firstName, lastName, phoneNumber, idResDev });
        
    } catch (error) {
        res.status(500).send(error);
    }

    // TODO: same http responses as previous todo mentioned

}


export const linkUserHouse = async (req = request, res = response) => {
    const { idHouse } = req.body;
    const { idUser } = req.params;

    let index = 0;
    let c = 0;

    try {
        const pool = await getConnection()
    
        const getReport = await pool?.request()
        .query(queriesReport.getAllUsersHouses);
            
            while (getReport?.recordset[index]) {
                // If both Ids are already in log, then it is true and C does not increment
                if ((getReport?.recordset[index].IdHouse == idHouse && getReport?.recordset[index].IdUser == idUser ) != true) {
                    c++;
                }
                // Index helps on making track of each record 
                index++;
            }

        if ((c >= index) == true) {
            await pool?.request()
            .input('idHouse', sql.Int, idHouse)
            .input('idUser', sql.Int, idUser)
            .query(queriesReport.createUsersHousesRegister); 
            console.log("Relationship done: " + c + " C - I " + index);
        } else {
            console.log("Unable to insert on users & houses relationship " + c + " C - I " + index);
        }

        res.status(200).json({ "Data linked": {
            "IdHouse": idHouse, 
            "IdUser": idUser
        } });
        
    } catch (error) {
        res.status(500).send(error);
    }

}