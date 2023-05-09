"use strict";

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import handlebars from "express-handlebars";
import logger from "morgan";
import router from "./routes/indexRoute.js";
import connect from "./config/db/connectDb.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// HTTP logger
app.use(logger("combined"));

// set view
app.engine(
    ".hbs",
    handlebars.engine({
        extname: ".hbs",
    })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "view"));

// set router
router(app);

// connect to mongo DB
connect();

// app listen
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});

// /test
