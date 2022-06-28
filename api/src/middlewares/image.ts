import multer from "multer";
import expressfileupload from "express-fileupload";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, `${Date.now()}-${file.originalname}`)
//     }
// })

// const upload = multer({ storage: storage })

// exports.upload = upload.single('myFile')

// exports.uploadFile = (req: any, res: any) => {
//     res.send({ data: 'Enviar un archivo' })
// }

// export function allowedImage(req: any, file: any, cb: any) {
//     if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
//         req.fileValidationError = 'Only image files are allowed!';
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// }

/*module.exports.image = {
    storage: function () {
        var storage = multer.diskStorage({
            destination: function (req: any, file: any, cb: any) {
                cb(null, 'public/images/')
            },
            filename: function (req: any, file: any, cb: any) {
                cb(null, file.originalname)
            }
        })
        return storage;
    },
    allowedImage: function (req: any, file: any, cb: any) {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
            req.fileValidationError = 'Only image files are allowed!';
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}*/