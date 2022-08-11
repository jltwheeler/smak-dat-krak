import { KrakenClient } from "./krakenClient";
import { composeUniquePairs } from "./utils/dataTransformers";

const main = async () => {
  const kraken = new KrakenClient();

  try {
    const trades = await kraken.getTradeHistory();

    if (trades?.trades) {
      const uniquePairs = composeUniquePairs(trades.trades);
      console.log(uniquePairs);
    }
  } catch (err) {
    console.error(err);
  }
};

main();
