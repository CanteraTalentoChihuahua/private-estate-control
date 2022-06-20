import { Router } from "express";
import { createRes, getRes, getResById, updateResById, deleteResById } from "../controllers/residentials";

const router = Router();

router.get("/get", getRes);

router.get("/get/:id", getResById);

router.post("/post", createRes);

router.put("/put/:id", updateResById);

router.delete("/delete/:id", deleteResById);

export default router;