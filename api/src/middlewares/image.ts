import multer from "multer";
import { createIncome } from "../controllers/incomes";

const path = "uploads/";            //TODO: Change path to the path of the server where the receipts will be stored

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path)
    },
    filename: function (req, file, cb) {
        console.log(file);
        console.log(req.body);
        let name = `${Date.now()}_${file.originalname}`;
        const pathname = path + name;
        req.body.path = pathname;
        createIncome(req);
        cb(null, name)
    }
})

export const upload = multer({ storage: storage })