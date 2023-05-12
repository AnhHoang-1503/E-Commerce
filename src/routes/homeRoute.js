import { Router } from "express";
import homeController from "../app/controller/homeController.js";

const router = Router();

router.get("/", homeController.index);

export default router;
