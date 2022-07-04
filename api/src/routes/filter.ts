import { Router } from "express";
import { filter } from "../controllers/filter";

const router = Router();

router.get("/", filter);

// router.get("/listpersons", listpersons);

// router.get("/deleteall", deleteallpersons);

// router.get("/createface", createFaceID);

// router.post("/faceid", faceId)

export default router;