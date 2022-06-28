import { Router } from "express";
import { createRes, getRes, getResById, updateResById, deleteResById, updateResBalance } from "../controllers/residentials";

const router = Router();

router.get("/get", getRes);

router.get("/get/:id", getResById);

router.post("/post", createRes);

router.put("/put/:id", updateResById);

router.put("/put/balance/:id", updateResBalance);

router.delete("/delete/:id", deleteResById);

export default router;