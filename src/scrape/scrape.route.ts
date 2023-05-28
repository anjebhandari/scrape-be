import express from "express";

import * as scrapeController from "./scrape.controller";
import scrapeSchema from "./scrape.validators";

import validate from '../platforms/config/validation';

const router = express.Router();

router.route("/").post(scrapeController.store);
router.route("/watchlist/add").post(validate(scrapeSchema.store, 'body') ,scrapeController.storeWatchList);
router.route("/watchlist").post(scrapeController.searchWatchList);
router.route("/search").post(scrapeController.findAll);

export default router;
