import { Router } from "express";
import { authLogin, getLogin, testGet, validateToken } from "../controllers/auth";

const router = Router();

router.get('/test', validateToken, testGet);

router.get('/', getLogin);

router.post('/auth', authLogin);

export default router;