import homeRouter from "./home-route.js";
import accountRouter from "./account-route.js";
import pagesRouter from "./pages-route.js";
import blogRouter from "./blog-route.js";
import productsRouter from "./products-route.js";
import searchRouter from "./search-route.js";
import collectionRouter from "./collections-route.js";
import cartRouter from "./cart-route.js";

function router(app) {
    app.use("/collections", collectionRouter);

    app.use("/cart", cartRouter);

    app.use("/account", accountRouter);

    app.use("/pages", pagesRouter);

    app.use("/blog", blogRouter);

    app.use("/products", productsRouter);

    app.use("/search", searchRouter);

    app.use("/", homeRouter);
}

export default router;
