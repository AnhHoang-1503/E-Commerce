import { Router } from "express";
import pagesController from "../app/controller/pagesController.js";

const router = Router();

router.route("/").get(pagesController.index);

export default router;
