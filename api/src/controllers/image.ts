import { getConnection } from "../conf/db";
import sql from "mssql";
import queries from "../models/image"
import expressfileupload from "express-fileupload";
import multer from "multer";

export const getImages = async (req: any, res: any) => {
    res.send(`
    <form action="/images" method="POST" encType="multipart/form-data">
        <h3>Upload Receipt Photo</h3>
        <input type="file" name="image" accept="image/*" />
        <input type="submit" name="submit" class="btn btn-primary">
    </form>
    `);
}