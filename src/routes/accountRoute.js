import { Router } from "express";
import accountController from "../app/controller/AccountController.js";
import passport from "passport";

const router = Router();

router
    .route("/login")
    .get(accountController.login)
    .post(
        passport.authenticate("local", {
            successRedirect: "/",
            failureMessage: true,
            failureRedirect: "/account/login",
        }),
        function (req, res) {
            res.redirect("/");
        }
    );

router
    .route("/register")
    .get(accountController.register)
    .post(accountController.registerPost);

router.route("/logout").post(accountController.logout);

router.route("/").get(accountController.index);

export default router;
