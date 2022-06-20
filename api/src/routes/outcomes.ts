import { Router } from "express";
import { getOutcomes } from "../controllers/outcomes";

//import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", getOutcomes);

export default router;