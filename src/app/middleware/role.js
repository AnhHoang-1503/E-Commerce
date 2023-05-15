function isAdmin(req, res, next) {
    try {
        if (res.locals.session.passport.user.role == "admin") {
            next();
        } else {
            res.redirect("/account");
        }
    } catch (error) {
        next();
    }
}

export default isAdmin;
