import Product from "../models/product-model.js";
import {
    mongooseToObject,
    mutipleMongooseToObject,
} from "../../util/mongoose.js";

//  GET products/create
function create(req, res, next) {
    try {
        res.render("products/create", { title: "Create product" });
    } catch (error) {
        next();
    }
}

// GET products/:id/edit
function edit(req, res, next) {
    try {
        Product.findOne({ _id: req.params.id })
            .then((product) => {
                res.render("products/edit", {
                    title: "Edit product",
                    product: mongooseToObject(product),
                });
            })
            .catch(next);
    } catch (error) {
        next();
    }
}

// GET products/bin
function bin(req, res, next) {
    try {
        Product.find({ deleted: true })
            .then((products) => {
                res.render("products/bin", {
                    title: "Recycle Bin",
                    products: mutipleMongooseToObject(products),
                });
            })
            .catch(next);
    } catch (error) {
        next();
    }
}

// POST products
async function store(req, res, next) {
    try {
        const product = {
            _id: req.objectId,
            name: req.body.name,
            price: Number(req.body.price),
            image: `/productsImg/${req.file.filename}`,
            amount: req.body.amount,
            description: req.body.description,
        };
        await Product.create(product);
        res.redirect("/account");
    } catch (error) {
        next();
    }
}

// POST products/:id/restore
function restore(req, res, next) {
    try {
        Product.updateOne(
            { _id: req.params.id, deleted: true },
            { deleted: false }
        )
            .then(() => {
                res.redirect("back");
            })
            .catch(next);
    } catch (error) {
        next();
    }
}

// DELETE products/:id
async function deleteProduct(req, res, next) {
    try {
        await Product.updateOne({ _id: req.params.id }, { deleted: true });
        res.redirect("/account");
    } catch (error) {
        next;
    }
}

// PATCH products/:id/edit
async function update(req, res, next) {
    try {
        const product = {
            name: req.body.name,
            price: Number(req.body.price),
            amount: req.body.amount,
            description: req.body.description,
        };
        await Product.updateOne({ _id: req.params.id }, product);
        res.redirect("/account");
    } catch (error) {}
}

export default { create, store, edit, update, deleteProduct, bin, restore };
