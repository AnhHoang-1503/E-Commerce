import Product from "../models/product-model.js";
import { mutipleMongooseToObject } from "../../util/mongoose.js";

// GET /search
async function search(req, res, next) {
    try {
        let products = await Product.find({ deleted: false });
        products = mutipleMongooseToObject(products);
        const query = req.query.q;
        let result = [];
        products.forEach((product) => {
            if (
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            ) {
                result.push(product);
            }
        });
        res.render("search", { title: "Search", products: result, query });
    } catch (error) {
        next();
    }
}

// GET /search/bar
async function searchBar(req, res, next) {
    try {
        let products = await Product.find({ deleted: false });
        products = mutipleMongooseToObject(products);
        const query = req.query.q;
        let result = [];
        products.forEach((product) => {
            if (
                product.name.toLowerCase().includes(query.toLowerCase()) ||
                product.description.toLowerCase().includes(query.toLowerCase())
            ) {
                result.push(product);
            }
        });
        res.json({ result });
    } catch (error) {
        next();
    }
}

export default { search, searchBar };
