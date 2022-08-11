import axios from "axios";
import dotenv from "dotenv";
import qs from "qs";
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

  async getAccountBalance() {
    const path = "/0/private/Balance";
    const nonce = getNonceValue();
    const reqParams = { nonce };

    const sig = createAPISignature({
      path,
      reqParams,
      secret: this.secret,
      nonce,
    });

    return axios
      .post(`${BASE_URL}${path}`, qs.stringify(reqParams), {
        headers: {
          "API-Key": this.apiKey,
          "API-Sign": sig,
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Smak Dat Krak",
        },
      })
      .then((d) => d.data);
  }
}
