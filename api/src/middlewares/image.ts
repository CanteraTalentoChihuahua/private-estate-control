import multer from "multer";

export function storage() {
    var storage = multer.diskStorage({
        destination: function (req: any, file: any, cb: any) {
            cb(null, 'public/images/')
        },
        filename: function (req: any, file: any, cb: any) {
            cb(null, file.originalname)
        }
    })
    return storage;
}

export function allowedImage(req: any, file: any, cb: any) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
}

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