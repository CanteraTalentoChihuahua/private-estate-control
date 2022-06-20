import { Router } from "express";
import { createOutcome, deleteOutcomeById, getOutcomeById, getOutcomes, updateOutcomeById } from "../controllers/outcomes";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", getOutcomes);

router.get("/get/:id", getOutcomeById);

router.post("/post", createOutcome);

router.put("/put/:id", updateOutcomeById);

router.delete("/delete/:id", deleteOutcomeById);

export default router;