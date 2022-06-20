// Face ID
import { Router } from "express";
import { createFaceID, deleteallpersons, faceId, facerecognition, listpersons } from "../controllers/facerecognition";

const router = Router();

router.get("/", facerecognition);

router.get("/listpersons", listpersons);

router.get("/deleteall", deleteallpersons);

router.get("/createface", createFaceID);

router.post("/faceid", faceId)

export default router;