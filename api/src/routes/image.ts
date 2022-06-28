import { Router } from "express";
import multer from "multer";
import { getImages } from "../controllers/image";


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

// exports.upload = upload.single('image')

const router = Router();

export default router;

router.get("/", getImages);

// router.get("/:id", getImageById);

router.post("/", upload.single("image"));

// router.put("/:id", updateImageById);

// router.delete("/:id", deleteImageById);

