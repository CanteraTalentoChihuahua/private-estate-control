import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/filter"
import { request } from "http";

export const filter = async (req: any, res: any) => {

    try {

        const pool = await getConnection();

        console.log(req.body);

        switch (req.body.filter) {
            case "dates":

                let initialdate = String.raw`'` + req.body.iniDate + String.raw`'`;
                let finaldate = String.raw`'` + req.body.endDate + String.raw`'`;

                const resDates = await pool?.request()
                    .input('iniDate', initialdate)
                    .input('endDate', finaldate)
                    .query(queries.dates);

                console.log(queries.dates);

                res.send(resDates);
                break;

            case "datesDesc":
                const resDatesDesc = await pool?.request()
                    .input('iniDate', sql.VarChar, req.body.iniDate)
                    .input('endDate', sql.VarChar, req.body.endDate)
                    .query(queries.dates);

                res.send(resDatesDesc);
                break;

            case "datesAsc":
                const resDatesAsc = await pool?.request()
                    .input('iniDate', sql.VarChar, req.body.iniDate)
                    .input('endDate', sql.VarChar, req.body.endDate)
                    .query(queries.dates);

                res.send(resDatesAsc);
                break;

            case "DespDesc":
                const resDespDesc = await pool?.request()
                    .query(queries.dateDesc);

                res.send(resDespDesc?.recordset[0]);

                break;

            case "DespAsc":
                const resDespAsc = await pool?.request()
                    .query(queries.despAsc);

                res.send(resDespAsc?.recordset[0]);
                break;

            case "dateDesc":
                const resDateDesc = await pool?.request()
                    .query(queries.dateDesc);

                res.send(resDateDesc?.recordset[0]);
                break;

            case "dateAsc":
                const resDateAsc = await pool?.request()
                    .query(queries.dateAsc);

                res.send(resDateAsc?.recordset[0]);
                break;

            default:
                res.send("There is not a filter for that" + req.body.filter);
                break;
        }

    } catch (error) {
        res.status(500).send(error);
    }

}