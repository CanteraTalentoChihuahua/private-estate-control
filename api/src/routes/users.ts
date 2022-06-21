import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, getUsersHouses, updateUserById } from "../controllers/users";
import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", validateSA, getUsers);

router.get("/get/usershouses", getUsersHouses);

router.get("/get/count", validateToken, getTotalUsers);

router.get("/get/:id", getUserById);

router.post("/post", createUser);

router.put("/put/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

export default router;