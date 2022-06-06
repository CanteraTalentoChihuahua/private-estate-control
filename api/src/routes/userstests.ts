import { Router } from "express";
import { createUser, deleteUserById, getTotalUsers, getUserById, getUsers, updateUserById } from "../controllers/userstests";

const router = Router();

router.get("/userstest", getUsers);

router.get("/userstest/count", getTotalUsers);

router.get("/userstest/:id", getUserById);

router.post("/userstest", createUser);

router.put("/userstest/:id", updateUserById);

router.delete("/userstest/:id", deleteUserById);

export default router;