import Login from "../models/loginModel.js";
import User from "../models/userModel.js";
import hasher from "../../util/hasher.js";
import {
    mutipleMongooseToObject,
    mongooseToObject,
} from "../../util/mongoose.js";
import { ObjectId } from "mongodb";

// GET account/login
function login(req, res, next) {
    res.render("account/login", {
        title: "Login",
        message: req.flash("messages")[0],
    });
}

// GET account/register
function register(req, res, next) {
    res.render("account/register", {
        title: "Create account",
        message: req.flash("messages")[0],
    });
}

// GET account/rspass
function resetPassword(req, res, next) {
    res.render("account/resetPassword", {
        title: "Reset password",
        message: req.flash("messages")[0],
    });
}

// GET account/
function index(req, res, next) {
    if (res.locals.session.passport === undefined) {
        res.redirect("/account/login");
    } else if (res.locals.session.passport.user.role === "user") {
        res.render("account/user", { title: "Acount" });
    } else {
        res.render("account/admin", { title: "Acount" });
    }
}

// POST account/register
async function registerPost(req, res, next) {
    try {
        const data = req.body;
        const account = await Login.findOne({ email: data.email });
        // check if email already exists
        if (!account) {
            const output = await hasher(data.password);
            const newObjectId = new ObjectId();
            // create login
            await Login.create({
                _id: newObjectId,
                email: data.email,
                hash: output.hash,
                salt: output.salt,
            });
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
            req.flash("messages", "Email already exists");
            res.redirect("/account/register");
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

// PATCH account/resetpassword
async function resetPasswordPatch(req, res, next) {
    const output = await hasher(req.body.password);
    Login.updateOne(
        { email: req.body.email },
        { hash: output.hash, salt: output.salt }
    )
        .then(function (result) {
            if (result.modifiedCount == 0) {
                req.flash("messages", "Email does not exist");
                res.redirect("/account/resetpassword");
            } else {
                req.flash("messages", "Password changed");
                res.redirect("/account/login");
            }
        })
        .catch(next);
}

export default {
    login,
    register,
    registerPost,
    logout,
    index,
    resetPassword,
    resetPasswordPatch,
};
