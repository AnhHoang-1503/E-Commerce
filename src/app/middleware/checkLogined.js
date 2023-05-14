function checkLogined(req, res, next) {
    if (res.locals.session.passport === undefined) {
        res.redirect("/account/login");
    } else {
        next();
    }
}

export default checkLogined;
