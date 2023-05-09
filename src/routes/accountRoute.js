import { Router } from "express";
import accountController from "../app/controller/AccountController.js";
import passport from "passport";

const router = Router();

router
    .route("/login")
    .get(accountController.login)
    .post(
        passport.authenticate("local", {
            failureRedirect: "/account/login",
            successRedirect: "/",
        })
    );

router
    .route("/register")
    .get(accountController.register)
    .post(accountController.registerPost);

router.route("/logout").post(accountController.logout);

export default router;
