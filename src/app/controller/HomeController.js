class HomeController {
    // [GET] /
    index(req, res, next) {
        res.render("home");
    }
}

export default new HomeController();
