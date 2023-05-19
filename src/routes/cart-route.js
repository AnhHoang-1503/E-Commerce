import cartController from "../app/controller/cart-controller.js";
import { Router } from "express";

const router = Router();

router.route("/add/:id").post(cartController.add);

router.route("/remove/:id").post(cartController.remove);

router.route("/update/:id").post(cartController.update);

router
    .route("/checkout")
    .get(cartController.checkout)
    .post(cartController.payCheckout);

router.route("/checkout/success").get(cartController.success);

export default router;
