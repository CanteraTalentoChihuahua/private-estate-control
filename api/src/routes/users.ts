import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, unlinkUserById, updateUserById } from "../controllers/users";
import { validateToken, validateSA } from "../middlewares/jwt";

const router = Router();

router.get("/get", getUsers);

router.get("/get/count", validateToken, getTotalUsers);

router.get("/get/:id", getUserById);

router.post("/post", createUser);

router.put("/put/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

router.delete("/unlink/:id", unlinkUserById);

export default router;