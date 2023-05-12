import homeRouter from "./homeRoute.js";
import accountRouter from "./accountRoute.js";
import pagesRouter from "./pagesRoute.js";
import blogRouter from "./blogRoute.js";

function router(app) {
    app.use("/account", accountRouter);

    app.use("/pages", pagesRouter);

    app.use("/blog", blogRouter);

    app.use("/", homeRouter);
}

export default router;
