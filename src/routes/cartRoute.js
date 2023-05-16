import cartController from "../app/controller/cartController.js";
import { Router } from "express";

const router = Router();

router.route("/add/:id").post(cartController.add);

router.route("/remove/:id").post(cartController.remove);

router.route("/update/:id").post(cartController.update);

router.route("/checkout").get(cartController.checkout);

export default router;
