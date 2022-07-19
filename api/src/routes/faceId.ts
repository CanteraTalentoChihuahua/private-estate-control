// Face ID
import { Router } from "express";
import express from "express";
import * as path from 'path';

const router = Router();
const basePath = path.join(__dirname, '../../public');

router.use("/", express.static(basePath));

export default router;