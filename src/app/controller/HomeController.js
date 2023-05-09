const index = function (req, res, next) {
    console.log(req.session);
    res.render("home", req.session.passport);
};

export default { index };
