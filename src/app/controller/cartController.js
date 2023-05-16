import Product from "../models/productModel.js";
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
        console.log(req.session.cart);
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
        console.log(req.session.cart);
        res.json({ totalPrice });
    } catch (error) {
        next();
    }
}

function checkout(req, res, next) {
    try {
        console.log(res.locals.session);
        res.render("checkout", { title: "Checkout" });
    } catch (error) {
        next();
    }
}

export default { add, remove, update, checkout };
