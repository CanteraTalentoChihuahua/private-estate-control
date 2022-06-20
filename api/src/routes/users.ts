import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, updateUserById } from "../controllers/users";
import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", validateSA, getUsers);

router.get("/get/count", validateToken, getTotalUsers);

router.get("/get/:id", validateToken, getUserById);

router.post("/post", createUser);

router.put("/put/:id", validateToken, updateUserById);

router.delete("/delete/:id", validateToken, deleteUserById);

export default router;