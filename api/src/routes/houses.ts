// Houses
import { Router } from "express";
import { createHouse, deleteHouseById, getHouseById, getHouses, payment, updateHouseById } from "../controllers/houses";

const router = Router();

router.get("/get", getHouses);

router.get("/get/:id", getHouseById);

router.post("/post", createHouse);

router.put("/put/:id", updateHouseById);

router.delete("/delete/:id", deleteHouseById);

router.post("/payment", payment);

export default router;