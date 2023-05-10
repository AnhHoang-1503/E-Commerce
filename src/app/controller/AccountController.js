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
    res.render("login", { title: "Login" });
}

// GET account/register
function register(req, res, next) {
    res.render("register", { title: "Create account" });
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

// post account/logout
function logout(req, res, next) {
    req.session.destroy(function () {
        res.redirect("/account/login");
    });
}

export default { login, register, registerPost, logout };
