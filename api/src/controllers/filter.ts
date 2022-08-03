import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/filter";
import { Request, Response } from "express";

export const filters = async (req: Request, res: Response) => {

    console.log(req);
    const { filter, iniDate, endDate } = req.body;
    console.log("Filter = ", filter, " iniDate = ", iniDate, " endDate = ", endDate);

    try {
        const pool = await getConnection();

        switch (filter) {
            case 1:

                const resDates = await pool?.request()
                    .input('iniDate', sql.Date, "'" + iniDate + "'")
                    .input('endDate', sql.Date, "'" + endDate + "'")
                    .query(queries.dates);

                res.send(resDates?.recordset);
                break;

            case 2:
                const resDatesDesc = await pool?.request()
                    .input('iniDate', sql.Date, "'" + req.body.iniDate + "'")
                    .input('endDate', sql.Date, "'" + req.body.endDate + "'")
                    .query(queries.datesDesc);

                res.send(resDatesDesc?.recordset);
                break;

            case 3:
                const resDatesAsc = await pool?.request()
                    .input('iniDate', sql.Date, "'" + req.body.iniDate + "'")
                    .input('endDate', sql.Date, "'" + req.body.endDate + "'")
                    .query(queries.datesAsc);

                res.send(resDatesAsc?.recordset);
                break;

            case 4:
                const resDespDesc = await pool?.request()
                    .query(queries.despDesc);

                res.send(resDespDesc?.recordset);

                break;

            case 5:
                const resDespAsc = await pool?.request()
                    .query(queries.despAsc);

                res.send(resDespAsc?.recordset);
                break;

            case 6:
                const resDateDesc = await pool?.request()
                    .query(queries.dateDesc);

                res.send(resDateDesc?.recordset);
                break;

            case 7:
                const resDateAsc = await pool?.request()
                    .query(queries.dateAsc);

                res.send(resDateAsc?.recordset);
                break;

            default:
                res.send("There is not a filter for that " + req.body.filter);
                break;
        }

    } catch (error) {
        res.status(500).send(error);
    }

}