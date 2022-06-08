// Expenses
import { Router } from "express";
import { testExpenses } from "../controllers/expenses";

const router = Router();

router.get("/get", testExpenses);

export default router;