import searchController from "../app/controller/searchController.js";
import { Router } from "express";

const router = Router();

router.route("/").get(searchController.search);

router.route("/bar").get(searchController.searchBar);

export default router;
