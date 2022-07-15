import { Router } from "express";
import { test } from "../controllers/plates";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", test);

// router.get("/get/:id", getOutcomeById);

// router.post("/post", createOutcome);

// router.put("/put/:id", updateOutcomeById);

// router.delete("/delete/:id", deleteOutcomeById);

export default router;