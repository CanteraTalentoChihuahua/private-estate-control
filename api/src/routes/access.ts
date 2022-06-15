// Reports access when implementing AI
import { Router } from "express";
import { testAccess } from "../controllers/access";

const router = Router();

router.get("/get", testAccess);

export default router;