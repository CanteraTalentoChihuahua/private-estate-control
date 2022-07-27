import { PythonShell } from 'python-shell';
import { getConnection } from '../conf/db';
import sql from "mssql";
import levenshtein from "levenshtein";
import queries from "../models/plates"
import plates from '../models/plates';
import { each } from 'jquery';

export const test = async (req: any, res: any) => {

    try {
        let pyshell = new PythonShell('plates.py');

        // sends a message to the Python script via stdin
        pyshell.send('carro.jpeg'); //change this to req.body.image or something (this is the image to be looked up for plates)

        const fulljson = "";

        pyshell.on('message', async function (resp) {
            resp = resp.replace(/ /g, '');
            if (resp.substr(0, 8) == String.raw`'plate':`) {
                // console.log(resp);
                const plates = resp.substr(9).replace(",", "").replace("'", "");
                console.log("plates are: " + plates);
                // res.send("the plates are " + plates);
                const pool = await getConnection();
                const result = await pool?.request()
                    .input('plates', plates)
                    .query(queries.getPlate);


                // console.log(result?.rowsAffected[0]);

                if (result?.rowsAffected[0] != 0) {
                    res.send(result?.recordset[0]);
                    // console.log(result);

                    const d = new Date();
                    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

                    const result2 = await pool?.request()
                        .input('iduser', sql.Int, result?.recordset[0].IdUser)
                        .input('date', sql.DateTime2, date)
                        .input('IsFaceRecon', sql.Bit, 0)
                        .query(queries.access);
                }
                else {
                    console.log("plates not found trying another thing");
                    const result = await pool?.request()
                        .input('plates', plates)
                        .query(queries.getAllPlates);

                    result?.recordset.forEach(async element => {
                        const platesAccess = new levenshtein(element.LicensePlate, plates);
                        if (Number(platesAccess) <= 2) {
                            console.log(`Access Plates Granted To: ${plates}`);
                            res.send(element);

                            const d = new Date();
                            const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

                            const result = await pool?.request()
                                .input('iduser', sql.Int, element.IdUser)
                                .input('date', sql.DateTime2, date)
                                .input('IsFaceRecon', sql.Bit, 0)
                                .query(queries.access);
                            return;
                        }
                    });
                    // console.log(`Access Denied To: ${plates}`)
                }
                // res.status(200);
            }
        });


        // end the input stream and allow the process to exit
        pyshell.end(function (err, code, signal) {
            if (err) throw err;
        });


    } catch (error) {
        res.status(500);
        res.send(error);
    }

}

export const test2 = async (req: any, res: any) => {

    try {
        console.log(req.body);
        res.status(200).send("Jala bien perron apoco no?");

    } catch (error) {
        res.status(500);
        res.send(error);
    }

}