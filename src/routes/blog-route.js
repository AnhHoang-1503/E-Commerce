import { Router } from "express";

const router = Router();

router.route("/").get((req, res) => {
    console.log(req.session);
    res.render("blog", { title: "Blog" });
});

export default router;
