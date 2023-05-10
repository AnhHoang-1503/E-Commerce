const index = function (req, res, next) {
    res.render("home", req.session.passport);
};

export default { index };
