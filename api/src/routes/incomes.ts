import { Router } from "express";
import { createIncome, deleteIncomeById, getIncomeById, getIncomes, updateIncomeById } from "../controllers/incomes";
import { upload } from "../middlewares/image";

const router = Router();

router.get("/get", getIncomes);

router.get("/get/:id", getIncomeById);

router.post("/post", upload.single("image"), createIncome);

router.put("/put/:id", updateIncomeById);

router.delete("/delete/:id", deleteIncomeById);

export default router;