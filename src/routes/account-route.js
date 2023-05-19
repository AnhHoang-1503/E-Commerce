import { Router } from "express";
import accountController from "../app/controller/account-controller.js";
import passport from "passport";
import checkLogined from "../app/middleware/check-logined.js";

const router = Router();

router
    .route("/login")
    .get(accountController.login)
    .post(
        passport.authenticate("local", {
            successRedirect: "/account",
            failureMessage: true,
            failureRedirect: "/account/login",
        })
    );

router
    .route("/register")
    .get(accountController.register)
    .post(accountController.registerPost);

router.route("/logout").post(accountController.logout);

router
    .route("/resetpassword")
    .get(accountController.resetPassword)
    .patch(accountController.resetPasswordPatch);

router.route("/").get(checkLogined, accountController.index);

export default router;
