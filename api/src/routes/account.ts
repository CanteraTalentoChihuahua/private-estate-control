// Account settings
import { Router } from "express";
import { testAccount } from "../controllers/account";

const router = Router();

router.get("/get", testAccount);

export default router;