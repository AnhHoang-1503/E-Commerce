const index = function (req, res, next) {
    res.render("home", { title: "Home" });
};

export default { index };
