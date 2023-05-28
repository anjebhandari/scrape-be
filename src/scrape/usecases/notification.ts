import knex from "../../platforms/config/knex";
import  { WatchListModel } from "../scrape.model";

export const notifications = async () => {
  try {
    const watchList = await WatchListModel.query().select("*");
    const keys = watchList?.map((item) => item.id);

    const response = await knex.raw(
      "select id,price from crypto where id in (" +
        keys.map((_: any) => "?").join(",") +
        ")",
      [...keys]
    );
    
    const data = response?.[0];
    let watch: any = [];
    keys.forEach((key: any, index: number) => {
      const cryptoData: any = data.filter((item: any) => item.id === key);
      const watchListData: any = watchList.filter((item) => item.id === key);
      let msg: string = "";
      if (cryptoData[0].price < watchListData[0].min_price) {
        msg = `The price of ${watchListData[0].code} is down to ${cryptoData[0].price}`;
        watch = [...watch, { id: key, msg: msg }];
      }
      if (cryptoData[0].price > watchListData[0].max_price) {
        msg = `The price of ${watchListData[0].code} is up to ${cryptoData[0].price}`;
        watch = [...watch, { id: key, msg: msg }];
      }
    });

    return watch;
  } catch (error) {
    throw error;
  }
};
