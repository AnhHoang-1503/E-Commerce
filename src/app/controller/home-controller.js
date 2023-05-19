function index(req, res, next) {
    try {
        res.render("home", { title: "Home" });
    } catch (error) {
        next();
    }
}

export default { index };
