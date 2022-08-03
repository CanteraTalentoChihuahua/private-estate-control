import { Router } from "express";
import { filters } from "../controllers/filter";

const router = Router();

router.post("/", filters);

// router.get("/listpersons", listpersons);

// router.get("/deleteall", deleteallpersons);

// router.get("/createface", createFaceID);

// router.post("/faceid", faceId)

export default router;