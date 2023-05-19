import Product from "../models/product-model.js";
import User from "../models/user-model.js";
import { mongooseToObject } from "../../util/mongoose.js";

// POST /cart/add/:id
async function add(req, res, next) {
    try {
        if (!req.session.cart) {
            req.session.cart = [];
        }

        let quantity = 0;
        let product = await Product.findOne({
            _id: req.params.id,
            deleted: false,
        });
        product = mongooseToObject(product);

        let exits = false;
        req.session.cart.forEach((product) => {
            if (product._id == req.params.id) {
                product.quantity++;
                quantity = product.quantity;
                exits = true;
            }
        });
        if (!exits) {
            product.quantity = 1;
            quantity = 1;
            req.session.cart.push(product);
        }
        product.quantity = quantity;
        // calculate total price
        let totalPrice = 0;
        req.session.cart.forEach((product) => {
            totalPrice += product.price * product.quantity;
        });
        res.json({ product, exits, totalPrice });
    } catch (error) {
        next();
    }
}

// POST /cart/remove/:id
async function remove(req, res, next) {
    try {
        req.session.cart.forEach((product, index) => {
            if (product._id == req.params.id) {
                req.session.cart.splice(index, 1);
            }
        });
        // calculate total price
        let totalPrice = 0;
        req.session.cart.forEach((product) => {
            totalPrice += product.price * product.quantity;
        });
        res.json({ totalPrice });
    } catch (error) {
        next();
    }
}

// POST /cart/update/:id?quantity=
async function update(req, res, next) {
    try {
        req.session.cart.forEach((product, index) => {
            if (product._id == req.params.id) {
                product.quantity = req.query.quantity;
            }
        });

        // calculate total price
        let totalPrice = 0;
        req.session.cart.forEach((product) => {
            totalPrice += product.price * product.quantity;
        });
        res.json({ totalPrice });
    } catch (error) {
        next();
    }
}

// GET /cart/checkout
function checkout(req, res, next) {
    try {
        res.render("cart/checkout", { title: "Checkout" });
    } catch (error) {
        next();
    }
}

// GET /cart/checkout/success
function success(req, res, next) {
    try {
        res.render("cart/success", { title: "Success" });
    } catch (error) {
        next();
    }
}

// POST /cart/checkout
async function payCheckout(req, res, next) {
    try {
        let user;
        if (
            req.session.passport != undefined &&
            req.session.passport.user.role == "user"
        ) {
            user = await User.findOne({
                email: req.session.passport.user.email,
            });
            user.purchaseHistory.push(...req.session.cart);
            await User.findOneAndUpdate({ email: user.email }, user);
            req.session.cart = [];
        }
        res.json({ message: "pay checkout", user });
    } catch (error) {
        next();
    }
}

export default { add, remove, update, checkout, payCheckout, success };
