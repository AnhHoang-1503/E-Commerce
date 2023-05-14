import Product from "../models/productModel.js";

//  GET products/create
function create(req, res, next) {
    try {
        res.render("products/create", { title: "Create product" });
    } catch (error) {
        next(error);
    }
}

// POST products
async function store(req, res, next) {
    try {
        const product = {
            _id: req.objectId,
            name: req.body.name,
            price: req.body.price,
            image: `/productsImg/${req.file.filename}`,
            amount: req.body.amount,
            description: req.body.description,
        };
        await Product.create(product);
        res.redirect("/account");
    } catch (error) {
        next(error);
    }
}

export default { create, store };
