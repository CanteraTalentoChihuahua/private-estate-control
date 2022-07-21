import multer from "multer";

const path = "uploads/";            //TODO: Change path to the path of the server where the receipts will be stored

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, path)
    },
    filename: function (req: any, file: any, cb: any) {
        // console.log(file);
        // console.log(req.params);
        let name = `${req.body.prefix}_${file.originalname}`;
        // const pathname = path + name;
        // req.body.path = pathname;
        // createIncome(req);
        cb(null, name)
    }
})

export const upload = multer({ storage: storage })