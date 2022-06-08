import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, updateUserById } from "../controllers/users";

const router = Router();

router.get("/get", getUsers);

router.get("/get/count", getTotalUsers);

router.get("/get/:id", getUserById);

router.post("/post", createUser);

router.put("/put/:id", updateUserById);

router.delete("/delete/:id", deleteUserById);

export default router;