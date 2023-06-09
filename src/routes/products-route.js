import { Router } from "express";
import productsController from "../app/controller/products-controller.js";
import isAdmin from "../app/middleware/role.js";
import checkLogined from "../app/middleware/check-logined.js";
import storeImg from "../app/middleware/store-img.js";
import idGenerator from "../app/middleware/id-generator.js";

const router = Router();

router.route("/create").get(checkLogined, isAdmin, productsController.create);

router.route("/bin").get(checkLogined, isAdmin, productsController.bin);

router
    .route("/:id/restore")
    .post(checkLogined, isAdmin, productsController.restore);

router
    .route("/:id/edit")
    .get(checkLogined, isAdmin, productsController.edit)
    .patch(checkLogined, isAdmin, storeImg, productsController.update);

router
    .route("/:id")
    .delete(checkLogined, isAdmin, productsController.deleteProduct);

router.route("/").post(idGenerator, storeImg, productsController.store);

export default router;
