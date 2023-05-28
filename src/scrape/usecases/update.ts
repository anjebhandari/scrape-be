import axios from "axios";

import knex from "../../platforms/config/knex";

export const update = async (__: any) => {
  const response = await axios.get(
    "https://coinranking.com/api/v2/coins?limit=5000&tiers[]=1&orderBy=change&orderDirection=desc&timePeriod=24h"
  );

  await response?.data?.data?.coins?.map(async (item: any) => {
    //update
   return await  knex("crypto").where("id", "=", item.uuid).update({
      image: item.iconUrl,
      code: item.symbol,
      name: item.name,
      Price: item.price,
      "Market Cap": item.marketCap,
       "24H": item["24hVolume"],
       updated_date: new Date()
    });
  });
};
