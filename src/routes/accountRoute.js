import { Router } from "express";
import accountController from "../app/controller/AccountController.js";

const router = Router();

router.route("/login").get(accountController.login);
router
    .route("/register")
    .get(accountController.register)
    .post(accountController.registerPost);

export default router;
