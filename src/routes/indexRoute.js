import homeRouter from "./homeRoute.js";
import accountRouter from "./accountRoute.js";
import pagesRouter from "./pagesRoute.js";
import blogRouter from "./blogRoute.js";
import productsRouter from "./productsRoute.js";
import searchRouter from "./searchRoute.js";
import collectionRouter from "./collectionsRoute.js";
import cartRouter from "./cartRoute.js";

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
