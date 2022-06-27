import { Router } from "express";
import { getBasedOnHouse, getRegistry } from "../controllers/registry";

const router = Router();

router.get("/get/:id", getRegistry);

router.get("/get/user/:id", getBasedOnHouse);

export default router;