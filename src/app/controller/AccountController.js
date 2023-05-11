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
<<<<<<< Updated upstream
        })
        .catch(next);
};

export default { login, loginPost, register, registerPost };
=======
            // create user
            await User.create({
                _id: newObjectId,
                email: data.email,
                firstName: data.firstName,
                lastName: data.lastName,
                role: "user",
            });
            res.redirect("/account/login");
        } else {
            req.session.messages = [];
            req.session.messages.push("Email already exists");
            res.render("register", { title: "Create account" });
        }
    } catch (error) {
        next(error);
    }
}

// POST account/logout
function logout(req, res, next) {
    req.session.destroy(function () {
        res.redirect("/account/login");
    });
}

// GET account/
function index(req, res, next) {
    if (res.locals.session.passport == undefined) {
        res.redirect("/account/login");
    } else {
        res.json(res.locals.session.passport.user);
    }
}

export default { login, register, registerPost, logout, index };
>>>>>>> Stashed changes
