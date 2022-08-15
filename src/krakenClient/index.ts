import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
import { Ticker, TickerResp, TradeHistory } from "../types";
import { createAPISignature } from "../utils";
import { getNonceValue, IReqParams } from "../utils/createAPISignature";

dotenv.config();

interface Response<T> {
  error: string[];
  result: T;
}

const BASE_URL = "https://api.kraken.com";
const BASE_HEADERS = {
  "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
  "User-Agent": "Smak Dat Krak",
};

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

  async getTickerInfo(pair: string): Promise<Ticker | undefined> {
    const data = (
      await axios.get<TickerResp>(`${BASE_URL}/0/public/Ticker`, {
        params: {
          pair,
        },
      })
    ).data;

    if (data.error?.length) throw new Error(data.error?.join(" | "));

    return data.result;
  }

  async privateRequest<T>(
    resource: string,
    inputParams: IReqParams = {}
  ): Promise<T> {
    const path = `/0/private/${resource}`;
    const nonce = getNonceValue();
    const reqParams = { nonce, ...inputParams };

    const sig = createAPISignature({
      path,
      reqParams,
      secret: this.secret,
      nonce,
    });

    const data = (
      await axios.post<Response<T>>(
        `${BASE_URL}${path}`,
        qs.stringify(reqParams),
        {
          headers: {
            "API-Key": this.apiKey,
            "API-Sign": sig,
            ...BASE_HEADERS,
          },
        }
      )
    ).data;

    // TODO: for responses over 50 results, need to add pagination counter using 'ofs' (integer) parameter e.g. 'ofs=50'

    if (data.error?.length) throw new Error(data.error?.join(" | "));

    return data.result;
  }

  async getTradeHistory(): Promise<TradeHistory | undefined> {
    return await this.privateRequest<TradeHistory>("TradesHistory");
  }
}
