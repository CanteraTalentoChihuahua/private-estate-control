import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, updateUserById } from "../controllers/users";

const router = Router();

router.get("/users", getUsers);

router.get("/users/count", getTotalUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updateUserById);

router.delete("/users/:id", deleteUserById);

export default router;