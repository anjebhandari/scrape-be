import axios from "axios";

import ScrapeModel, { WatchListModel} from "../scrape.model";

export const create = async (req: any, res: any) => {
  try {
    const response = await axios.get(
      "https://coinranking.com/api/v2/coins?limit=5000&tiers[]=1&orderBy=change&orderDirection=desc&timePeriod=24h"
    );

    await response?.data?.data?.coins?.map(async (item: any) => {

      return await ScrapeModel.query().insert({
        id:item.uuid,
        image: item.iconUrl,
        code: item.symbol,
        name: item.name,
        Price: item.price,
        "Market Cap": item.marketCap,
        "24H": item["24hVolume"],
      });
    });
    return {return_msg: 'Data Added.'}  
  } catch (error) {
    throw error;
  }
};

export const createWatchList = async (payload: any, res: any) => {
    try { 
        const records = await WatchListModel.query().insert({
            ...payload,
            created_date: new Date()
        });
        return [{ return_message: `Watch List added for ${payload.code}` }];
    } catch (error) { throw error; }
}
