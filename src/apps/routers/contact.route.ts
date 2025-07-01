import { Router } from "express";
import { IdentifyController } from "../controllers/contact.controller";

const router = Router();
const controller = new IdentifyController();

router.post("/identify", controller.identify);

export default router;
