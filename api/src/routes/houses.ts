// Houses
import { Router } from "express";
import { createHouse, deleteHouse, getHouseById, getHouses, updateHouse } from "../controllers/houses";

const router = Router();

router.post("/create", createHouse);

router.get("/getall", getHouses);

router.get("/get/:id", getHouseById);

router.put("/update/:id", updateHouse);

router.delete("/delete/:id", deleteHouse);

export default router;