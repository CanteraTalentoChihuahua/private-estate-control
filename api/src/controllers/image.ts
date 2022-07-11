import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/image"
import expressfileupload from "express-fileupload";
import multer from "multer";

export const getImages = async (req: any, res: any) => {
    res.send(`
    <form action="/images" method="POST" encType="multipart/form-data">
        <h3>Upload Receipt Photo</h3>
        <input type="file" name="image" accept="image/*,application/pdf" />
        <input type="submit" name="submit" class="btn btn-primary">
    </form>
    `);
}

const uploadPath = async (imgPath: any) => {

    try {
        const pool = await getConnection();
        const relationship = await pool?.request()
            .input('imgPath', sql.VarChar, imgPath)
            .query(queries.insertImage)

    } catch (error) {
        console.log("Something failed " + error);
    }
}

const path = "uploads/";            //TODO: Change path to the path of the server where the receipts will be stored

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path)
    },
    filename: function (req, file, cb) {
        console.log(file);
        let name = `${Date.now()}-${file.originalname}`;
        cb(null, name)
        uploadPath(path + name);
    }
})

export const upload = multer({ storage: storage })