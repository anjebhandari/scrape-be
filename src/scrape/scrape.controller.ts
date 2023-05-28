import { Request, Response, NextFunction } from "express";

import * as searchUseCase from "./usecases/search";
import * as createUseCase from "./usecases/create";
import * as updateCase from "./usecases/update";
import * as notificationCase from "./usecases/notification";
/**
 * Find all the crypto data.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const findAll = (req: Request, res: Response, next: NextFunction) => {
  searchUseCase
    .searchAll(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Store crypto records.
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const store = (req: Request, res: Response, next: NextFunction) => {
  createUseCase
    .create(req.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Update function for every other 5 minute
 */
export const update = () => {
  return updateCase.update("");
};

/**
 * Store Watch List
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */
export const storeWatchList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  createUseCase
    .createWatchList(req?.body, res)
    .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

export const searchWatchList = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
 searchUseCase.searchAllWatchList(req.body, res)
  .then((data) => res.json({ success: true, data }))
    .catch((err) => next(err));
};

/**
 * Notification API
 * @param {Object} req
 * @param {Object} res
 */
export const notification = async (
  req: Request,
  res: Response
) => {
return await notificationCase
    .notifications()
};
