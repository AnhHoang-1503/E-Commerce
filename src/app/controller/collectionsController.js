// GET /collections
function index(req, res, next) {
    res.render("collections", { title: "Collections" });
}

export default { index };
