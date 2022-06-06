import { Router } from "express";
import { authLogin, getLogin, testGet } from "../controllers/auth";
import { validateToken } from "../middlewares/jwt";

const router = Router();

router.get('/test', validateToken, testGet);

router.get('/', getLogin);

router.post('/auth', authLogin);

export default router;