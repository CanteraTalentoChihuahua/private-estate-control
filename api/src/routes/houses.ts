// Houses
import { Router } from "express";
import { testHouse } from "../controllers/houses";

const router = Router();

router.get("/get", testHouse);

export default router;