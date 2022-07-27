import { Router } from "express";
import { test, test2 } from "../controllers/plates";
import { upload } from "../middlewares/plates";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", test);

router.post("/post", upload.single("image"));

router.post("/", test2);

// router.put("/put/:id", updateOutcomeById);

// router.delete("/delete/:id", deleteOutcomeById);

export default router;