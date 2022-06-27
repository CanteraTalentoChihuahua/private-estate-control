import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/image"

export const storeImage = async (req: any, res: any) => {

    try {
        const pool = await getConnection();
        const result = await pool?.request()
            .input('receipt', sql.Binary, receipt)
            .query(queries.getImageDupe);

        if (resultDupe) {

        }

        // res.status(200).json(result?.recordset);

    } catch (error) {
        res.status(500);
        res.send(error);
    }
}

/*module.exports = {
    storeImage: function (inputValues: any, callback: any) {
        // check unique email address
        var sql = 'SELECT * FROM images WHERE image_name =?';
        db.query(sql, inputValues.image_name, function (err: any, data: any, fields: any) {
            if (err) throw err
            if (data.length > 1) {
                var msg = inputValues.image_name + " is already exist";
            } else {
                // save users data into database
                var sql = 'INSERT INTO images SET ?';
                db.query(sql, inputValues, function (err: any, data: any) {
                    if (err) throw err;
                });
                var msg = inputValues.image_name + "is uploaded successfully";
            }
            return callback(msg)
        })
    }
} */