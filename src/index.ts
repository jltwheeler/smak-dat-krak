import { KrakenClient } from "./krakenClient";

const main = async () => {
  const kraken = new KrakenClient();

  const res = await kraken.getAccountBalance();

  console.log(res);
};

main();
