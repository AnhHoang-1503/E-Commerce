import { Router } from "express";
import collectionsController from "../app/controller/collectionsController.js";

const router = Router();

router.route("/").get(collectionsController.index);

export default router;
