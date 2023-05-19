import Product from "../models/product-model.js";
import {
    mutipleMongooseToObject,
    mongooseToObject,
} from "../../util/mongoose.js";

// GET collections/
async function index(req, res, next) {
    try {
        const products = await Product.find({ deleted: false });
        res.render("collections/collections", {
            title: "Collections",
            products: mutipleMongooseToObject(products),
        });
    } catch (error) {
        next();
    }
}

// GET collections/:id
async function detail(req, res, next) {
    try {
        const product = await Product.findOne({
            _id: req.params.id,
            deleted: false,
        });
        res.render("collections/detail", {
            title: "Detail",
            product: mongooseToObject(product),
        });
    } catch (error) {
        next();
    }
}

export default { index, detail };
