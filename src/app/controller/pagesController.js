function index(req, res, next) {
    res.render("pages", { title: "Pages" });
}

export default { index };
