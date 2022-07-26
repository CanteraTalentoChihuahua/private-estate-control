import multer from "multer";

const path = "uploads/";            //TODO: Change path to the path of the server where the receipts will be stored

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, path)
    },
    filename: function (req: any, file: any, cb: any) {
        let name = `${req.body.prefix}_${file.originalname}`;
        cb(null, name)
    }
})

export const upload = multer({ storage: storage })