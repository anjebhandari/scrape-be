import knex from "../../platforms/config/knex";
import ScrapeModel, {WatchListModel} from "../scrape.model";

/**
 * Select all crypto record with criteria.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise}
 */
export const searchAll = async (payload: any, res: any) => {
  const page_number = payload?.page_number || 1;
  const page_size = payload?.page_size || 10;
  const sortBy = ["code"].includes(payload?.sort_by)
    ? payload?.sort_by
    : "code";
  const sortOrder = payload?.sort_order || "DESC";
  const key = payload?.search_key;
  const keys = key?.split(",");
  const pages: any = `${(page_number - 1) * page_size}`;

  try {
    let records: any;
    let paginationRes: any;
    let pagination: any;

      if (keys?.length > 1) {
          const response = await knex.raw('select * from crypto where code in (' + keys.map((_: any) => '?').join(',') + ')', [...keys]);
          records = response[0];
          paginationRes = response;
       } else {
        records = key
        ? await ScrapeModel.query()
            .select("*")
            .where("code", "LIKE", `${key}%`)
            .orderBy(sortBy, sortOrder)
            .offset(pages)
            .limit(page_size)
        : await ScrapeModel.query()
            .select("*")
            .orderBy(sortBy, sortOrder)
            .offset(pages)
            .limit(page_size);
  
      paginationRes = await knex.raw(
        `SELECT * from crypto ${key ? `WHERE code LIKE '${key}%'` : ``}`
      );
  
      }
  
    pagination = {
      total_records: paginationRes?.[0].length,
      total_pages: Math.ceil(paginationRes?.[0].length / page_size),
      page_number: page_number,
      page_size: page_size,
    };

    return { data: records, pagination };
  } catch (error) {
    throw error;
  }
};

/**
 * Select watchlist crypto record with criteria.
 *
 * @param {Object} req
 * @param {Object} res
 * @returns {Promise}
 */
export const searchAllWatchList = async (payload: any, res: any) => {
  const page_number = payload?.page_number || 1;
  const page_size = payload?.page_size || 10;
  const sortBy = ["code"].includes(payload?.sort_by)
    ? payload?.sort_by
    : "code";
  const sortOrder = payload?.sort_order || "DESC";
  const key = payload?.search_key;
  const keys = key?.split(",");
  const pages: any = `${(page_number - 1) * page_size}`;

  try {
    let records: any;
    let paginationRes: any;
    let pagination: any;

      if (keys?.length > 1) {
          const response = await knex.raw('select * from watch_lists where code in (' + keys.map((_: any) => '?').join(',') + ')', [...keys]);
          records = response[0];
          paginationRes = response;
       } else {
        records = key
        ? await WatchListModel.query()
            .select("*")
            .where("code", "LIKE", `${key}%`)
            .orderBy(sortBy, sortOrder)
            .offset(pages)
            .limit(page_size)
        : await WatchListModel.query()
            .select("*")
            .orderBy(sortBy, sortOrder)
            .offset(pages)
            .limit(page_size);
  
      paginationRes = await knex.raw(
        `SELECT * from watch_lists ${key ? `WHERE code LIKE '${key}%'` : ``}`
      );
  
      }
  
    pagination = {
      total_records: paginationRes?.[0].length,
      total_pages: Math.ceil(paginationRes?.[0].length / page_size),
      page_number: page_number,
      page_size: page_size,
    };

    return { data: records, pagination };
  } catch (error) {
    throw error;
  }
};
