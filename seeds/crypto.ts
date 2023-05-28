import { Knex } from "knex";
import axios from "axios";
import { v4 as uuid } from "uuid";
import ScrapeModel from '../src/scrape/scrape.model';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("crypto").del();

    const response = await axios.get(
        "https://coinranking.com/api/v2/coins?limit=100&tiers[]=1&orderBy=change&orderDirection=desc&timePeriod=24h"
      );
  
      const a = await response?.data?.data?.coins?.map((item: any) => {
          return {
            id:item.uuid,
            image: item.iconUrl,
            code: item.symbol,
            name: item.name,
            Price: item.price,
            "Market Cap": item.marketCap,
            "24H": item["24hVolume"],
            created_date: new Date()
          }
      });
    
    // Inserts seed entries
    await knex("crypto").insert(a);
};