import { Router } from "express";
import productsController from "../app/controller/productsController.js";
import isAdmin from "../app/middleware/role.js";
import checkLogined from "../app/middleware/checkLogined.js";
import storeImg from "../app/middleware/storeImg.js";
import idGenerator from "../app/middleware/idGenerator.js";

const router = Router();

router.route("/create").get(checkLogined, isAdmin, productsController.create);

router.route("/").post(idGenerator, storeImg, productsController.store);

export default router;
