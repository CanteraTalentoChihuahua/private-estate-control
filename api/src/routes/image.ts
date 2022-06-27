import { Router } from "express";
import { storeImage } from "../controllers/image";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

// router.get("/", getImages);

// router.get("/:id", getImageById);

router.post("/", storeImage);

// router.put("/:id", updateImageById);

// router.delete("/:id", deleteImageById);

export default router;