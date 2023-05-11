import { Router } from "express";
<<<<<<< Updated upstream
import accountController from "../app/controller/AccountController.js";
=======
import accountController from "../app/controller/accountController.js";
import passport from "passport";
>>>>>>> Stashed changes

const router = Router();

router.route("/login").get(accountController.login);
router
    .route("/register")
    .get(accountController.register)
    .post(accountController.registerPost);

export default router;
