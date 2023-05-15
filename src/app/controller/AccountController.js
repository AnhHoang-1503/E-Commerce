import Login from "../models/loginModel.js";
import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import hasher from "../../util/hasher.js";
import {
    mutipleMongooseToObject,
    mongooseToObject,
} from "../../util/mongoose.js";
import { ObjectId } from "mongodb";

// GET account/login
function login(req, res, next) {
    try {
        res.render("account/login", {
            title: "Login",
            message: req.flash("messages")[0],
        });
    } catch (error) {
        next();
    }
}

// GET account/register
function register(req, res, next) {
    try {
        res.render("account/register", {
            title: "Create account",
            message: req.flash("messages")[0],
        });
    } catch (error) {
        next();
    }
}

// GET account/rspass
function resetPassword(req, res, next) {
    try {
        res.render("account/resetPassword", {
            title: "Reset password",
            message: req.flash("messages")[0],
        });
    } catch (error) {
        next();
    }
}

// GET account/
function index(req, res, next) {
    try {
        if (res.locals.session.passport.user.role === "user") {
            res.render("account/user", { title: "Acount" });
        } else {
            admin(req, res, next);
        }
    } catch (error) {
        next();
    }
}

// GET account/ role = admin
async function admin(req, res, next) {
    try {
        let products = await Product.find({ deleted: false });
        mutipleMongooseToObject(products);
        res.render("account/admin", {
            title: "Acount",
            products: mutipleMongooseToObject(products),
        });
    } catch (error) {
        next();
    }
}

// POST account/register
async function registerPost(req, res, next) {
    try {
        const data = req.body;
        data.email = data.email.toLowerCase();
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
        next();
    }
}

// POST account/logout
function logout(req, res, next) {
    try {
        req.session.destroy(function () {
            res.redirect("/account/login");
        });
    } catch (error) {
        next();
    }
}

// PATCH account/resetpassword
async function resetPasswordPatch(req, res, next) {
    try {
        const email = req.body.email.toLowerCase();
        const output = await hasher(req.body.newpassword);
        Login.updateOne(
            { email: email },
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
    } catch (error) {
        next();
    }
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
