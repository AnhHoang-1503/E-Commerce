import { Router } from "express";
import homeController from "../app/controller/home-controller.js";

const router = Router();

router.get("/", homeController.index);

export default router;
