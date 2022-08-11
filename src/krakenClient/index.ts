import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
import { TradeHistory, TradeHistoryResp } from "../types";
import { createAPISignature } from "../utils";
import { getNonceValue } from "../utils/createAPISignature";

dotenv.config();

const BASE_URL = "https://api.kraken.com";

export class KrakenClient {
  secret: string;
  apiKey: string;

  constructor() {
    if (!process.env["KRAKEN_PRIVATE_KEY"])
      throw Error(
        "Please ensure you have defined a KRAKEN_PRIVATE_KEY value in the .env file"
      );
    this.secret = process.env["KRAKEN_PRIVATE_KEY"];

    if (!process.env["KRAKEN_PUBLIC_KEY"])
      throw Error(
        "Please ensure you have defined a KRAKEN_PUBLIC_KEY value in the .env file"
      );
    this.apiKey = process.env["KRAKEN_PUBLIC_KEY"];
  }

  async getTradeHistory(): Promise<TradeHistory | undefined> {
    const path = "/0/private/TradesHistory";
    const nonce = getNonceValue();
    const reqParams = { nonce };

    const sig = createAPISignature({
      path,
      reqParams,
      secret: this.secret,
      nonce,
    });

    const data = (
      await axios.post<TradeHistoryResp>(
        `${BASE_URL}${path}`,
        qs.stringify(reqParams),
        {
          headers: {
            "API-Key": this.apiKey,
            "API-Sign": sig,
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Smak Dat Krak",
          },
        }
      )
    ).data;

    // TODO: for responses over 50 results, need to add pagination counter using 'ofs' (integer) parameter e.g. 'ofs=50'

    if (data.error?.length) throw new Error(data.error?.join(" | "));

    return data.result;
  }
}
