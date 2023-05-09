import Login from "../models/loginModel.js";

class AccountController {
    // GET account/login
    login(req, res, next) {
        res.render("login");
    }
    // POST account/login
    loginPost(req, res, next) {
        res.redirect("/");
    }
    // GET account/register
    register(req, res, next) {
        res.render("register");
    }
    // POST account/register
    registerPost(req, res, next) {
        res.json(req.body);
        res.redirect("/");
    }
}

export default new AccountController();
