import { getConnection } from "../conf/db";
import sql from "mssql";

const userByName = `SELECT IdUser, FirstName + ' ' + LastName AS 'FullName' FROM T_Users WHERE FirstName + ' ' + LastName = @faceName`;
const accessRegister = `INSERT INTO T_Accesses (IdUser, Date, IsFaceRecon) VALUES (@idUser, @date, 1)`;

export async function loadPeople(req: any, res: any){
    const fName = `SELECT FirstName + ' ' + LastName AS 'FullName' FROM T_Users`;
    let i = 0;
    let arr = [];

    try {
        const pool = await getConnection();
        const getPeople = await pool?.request()
            .query(fName)
        
        while (getPeople?.recordset[i]) {
            arr.push(getPeople?.recordset[i]);
            i++;
        }

        return arr;

    } catch (error) {
        return console.log(error)
    }
}
// loadFromDatabase(newMatch)

export const loadFromDatabase = async (req: any, res: any) => {
    const { fullName } = req.params;
    let name = fullName.replaceAll("_", " ");
    let finalName = name.slice(0, -1)
    const resp = {response: finalName}

    const d = new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    try {
        const pool = await getConnection();
        const match = await pool?.request()
            .input('faceName', finalName)
            .query(userByName)

        if (finalName == match?.recordset[0].FullName) {
            await pool?.request()
                .input('idUser', sql.Int, match?.recordset[0].IdUser)
                .input('date', sql.DateTime2, date)
                .query(accessRegister)
            console.log("Access log registered" + date)
            return res.json({response: match?.recordset[0].FullName});
        } else {
            return console.log("Not a user or face with that name registered")
        } 

    } catch (error) {
        return console.log(error)
    }

}