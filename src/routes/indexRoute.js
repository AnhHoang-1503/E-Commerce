import homeRouter from "./homeRoute.js";
import accountRouter from "./accountRoute.js";

function router(app) {
    app.use("/account", accountRouter);

    app.use("/", homeRouter);
}

export default router;
