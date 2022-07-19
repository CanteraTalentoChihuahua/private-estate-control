// Reports access when implementing AI
import { Router } from "express";
import { getEntrances } from "../controllers/access";

const router = Router();

router.get("/get", getEntrances);

export default router;