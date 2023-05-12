import { Router } from "express";
import pagesController from "../app/controller/pagesController.js";

const router = Router();

router.route("/").get((req, res) => {
    res.redirect("/pages/about");
});

router.route("/about").get(pagesController.about);

router.route("/faq").get(pagesController.faq);

router.route("/contact").get(pagesController.contact);

export default router;
