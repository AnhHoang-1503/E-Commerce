import homeRouter from "./homeRoute.js";

function router(app) {
    app.use("/", homeRouter);
}

export default router;
