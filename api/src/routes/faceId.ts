// Face ID
import { Router } from "express";
import express from "express";
import * as path from 'path';

import { loadFromDatabase, loadPeople } from "../controllers/faceId";

const router = Router();
const basePath = path.join(__dirname, '../../public');
const dbPath = path.join(__dirname, '../../dist/conf');

router.use("/", express.static(basePath));
router.get("/fetch/people", loadPeople);
router.get("/fetch/:fullName", loadFromDatabase);


export default router;