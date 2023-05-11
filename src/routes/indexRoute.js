import homeRouter from "./homeRoute.js";
import accountRouter from "./accountRoute.js";
import collectionsRouter from "./collectionsRoute.js";
import pagesRouter from "./pagesRoute.js";

function router(app) {
    app.use("/account", accountRouter);

    app.use("/collections", collectionsRouter);

    app.use("/pages", pagesRouter);

    app.use("/", homeRouter);
}

export default router;
