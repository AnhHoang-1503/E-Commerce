import { Router } from "express";
import homeController from "../app/controller/HomeController.js";

const router = Router();

router.get("/", homeController.index);

export default router;
