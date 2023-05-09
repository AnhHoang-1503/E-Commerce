import Login from "../models/loginModel.js";
import hasher from "../authentication/hasher.js";

// GET account/login
const login = function (req, res, next) {
    res.render("login");
};
// POST account/login
const loginPost = function (req, res, next) {
    res.redirect("/");
};
// GET account/register
const register = function (req, res, next) {
    res.render("register");
};
// POST account/register
const registerPost = function (req, res, next) {
    const data = req.body;
    hasher(data.password)
        .then((output) => {
            res.json({
                email: data.email,
                salt: output.salt,
                hash: output.hash,
            });
        })
        .catch(next);
};

export default { login, loginPost, register, registerPost };
