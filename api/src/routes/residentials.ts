import { Router } from "express";
import { createRes, getallRes, getResById, updateRes, deleteRes } from "../controllers/residentials";

const router = Router();

router.post("/create", createRes);

router.get("/getall", getallRes);

router.get("/get/:id", getResById);

router.put("/update/:id", updateRes);

router.delete("/delete/:id", deleteRes);

export default router;