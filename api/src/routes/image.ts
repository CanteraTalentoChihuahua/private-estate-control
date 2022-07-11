import { Router } from "express";
import multer from "multer";
import { getImages, upload } from "../controllers/image";

// exports.upload = upload.single('image')

const router = Router();

export default router;

router.get("/", getImages);

// router.get("/:id", getImageById);

router.post("/", upload.single("image"));

// router.put("/:id", updateImageById);

// router.delete("/:id", deleteImageById);

