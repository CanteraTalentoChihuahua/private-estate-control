// Dashboard
import { Router } from "express";
import { testDashboard } from "../controllers/dashboard";

const router = Router();

router.get("/get", testDashboard);

export default router;