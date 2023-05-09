import Login from "../models/loginModel.js";
import User from "../models/userModel.js";
import hasher from "../authentication/hasher.js";
import {
    mutipleMongooseToObject,
    mongooseToObject,
} from "../../util/mongoose.js";
import { ObjectId } from "mongodb";

// GET account/login
function login(req, res, next) {
    res.render("login", { title: "Login" });
}

// POST account/login
function loginPost(req, res, next) {
    console.log(req.session);
    Login.findOne({ email: req.body.email }).then((account) => {
        account = mongooseToObject(account);
        res.json(account);
    });
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
            await Login.create({
                _id: newObjectId,
                email: data.email,
                hash: output.hash,
                salt: output.salt,
            });
            await User.create({
                _id: newObjectId,
                email: data.email,
            });
            res.redirect("/account/login");
        } else {
            res.render("register", {
                title: "Create account",
                message: "Email already exists",
            });
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

export default { login, loginPost, register, registerPost, logout };
