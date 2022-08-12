import { KrakenClient } from "./krakenClient";
import { Trade } from "./types";
import { composeUniquePairs } from "./utils/dataTransformers";

interface DCA {
  total_vol: number;
  total_cost: number;
  total_fee: number;
  dca?: number;
  livePrice?: number;
}

type DCARecord = Record<string, DCA>;

const sumReduce = (key: keyof Trade) => (sum: number, current: Trade) => {
  const val = current[key] as string;
  return sum + parseFloat(val);
};

const main = async () => {
  const kraken = new KrakenClient();

  try {
    const trades = await kraken.getTradeHistory();

    if (!trades?.trades) return;

    const uniquePairs = composeUniquePairs(trades.trades);

    const dcas = Object.entries(uniquePairs).reduce<DCARecord>((prev, curr) => {
      const assetDCA: DCA = {
        total_vol: curr[1].reduce(sumReduce("vol"), 0),
        total_cost: curr[1].reduce(sumReduce("cost"), 0),
        total_fee: curr[1].reduce(sumReduce("fee"), 0),
      };

      return {
        ...prev,
        [curr[0]]: assetDCA,
      };
    }, {});

    const pairs = Object.keys(dcas);
    for (let i = 0; i < pairs.length; i++) {
      const ticker = await kraken.getTickerInfo(pairs[i]);
      if (ticker) {
        const price = ticker[pairs[i]]?.c?.[0];
        dcas[pairs[i]].livePrice = price ? parseFloat(price) : 0;
      }
    }

    console.log(dcas);
  } catch (err) {
    console.error(err);
  }
};

main();
