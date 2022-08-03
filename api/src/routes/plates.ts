import { Router } from "express";
import { test, image } from "../controllers/plates";
import { upload } from "../middlewares/plates";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", test);

router.post("/post", upload.single("image"));

router.get("/", image);

// router.put("/put/:id", updateOutcomeById);

// router.delete("/delete/:id", deleteOutcomeById);

export default router;