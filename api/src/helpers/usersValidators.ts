import { getConnection } from '../conf/db';
import queriesUsers from "../models/users";
import queriesHouses from "../models/houses"

export const emailValidator = async (email = '') =>{

    const pool = await getConnection();
    const result = await pool?.request()
    .input('email', email)
    .query(queriesUsers.emailVerification);

    if (!(result?.recordset.length == 0)) {
        throw new Error(`Este correo: ${email} ya se encuentra registrado`);
    }
}

export const userValidator = async (id : number) => {
    const pool = await getConnection();
    const result = await pool?.request()
    .input('id', id)
    .query(queriesUsers.getUserById);

    if (result?.recordset.length == 0) {
        throw new Error(`El usuario con el id: '${id}' no existe`);
    }
}

export const houseValidator = async (idHouse : number) => {
    const pool = await getConnection();
    const result = await pool?.request()
    .input('id', idHouse)
    .query(queriesHouses.getHouseById);

    if (result?.recordset.length == 0) {
        throw new Error(`La casa con el id: '${idHouse}' no existe`);
    }
}

export const relationshipValidator = async (idUser : number, idHouse : number) => {
    console.log('estoy aqui');
    throw new Error("asdasd"+ idUser);
}