"use strict";

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import handlebars from "express-handlebars";
import logger from "morgan";
import router from "./routes/indexRoute.js";
import connect from "./config/db/connectDb.js";
import session from "express-session";
import passport from "passport";
import passportConfig from "./config/auth/passport.js";
import methodOverride from "method-override";
import flash from "connect-flash";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// set view
app.engine(
    ".hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "view"));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: "secret",
    })
);
app.use(express.static(path.join(__dirname, "public"))); // set static file
app.use(logger(":method :url")); // set logger
app.use(methodOverride("_method"));
app.use(flash());
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

// set router
router(app);

// passport config
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport);

// connect to mongo DB
connect();

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handlers
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render("error", {
            message: err.message,
            error: err,
            status: err.status,
        });
    } else {
        res.send(err.message);
    }
});

// app listen
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
