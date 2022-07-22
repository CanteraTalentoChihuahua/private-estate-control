import multer from "multer";

const path = "plates/";            //TODO: Change path to the path of the server where the receipts will be stored

const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, path)
    },
    filename: function (req: any, file: any, cb: any) {
        let name = "plate.jpeg";
        cb(null, name)
    }
})

export const upload = multer({ storage: storage })