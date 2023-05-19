import { Router } from "express";
import pagesController from "../app/controller/pages-controller.js";

const router = Router();

router.route("/about").get(pagesController.about);

router.route("/faq").get(pagesController.faq);

router.route("/contact").get(pagesController.contact);

router.route("/").get((req, res) => {
    res.redirect("/pages/about");
});

export default router;
