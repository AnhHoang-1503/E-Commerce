import collectionsController from "../app/controller/collectionsController.js";
import { Router } from "express";

const router = Router();

router.route("/").get(collectionsController.index);

router.route("/:id").get(collectionsController.detail);

export default router;
