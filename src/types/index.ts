import { components } from "./schema";

export type TradeHistoryResp = components["schemas"]["history-2"];
export type TradeHistory = components["schemas"]["history-2"]["result"];
export type Trade = components["schemas"]["trade-2"];
export type Trades = { [key: string]: Trade };

export type TickerResp = components["schemas"]["ticker-2"];
export type Ticker = { [key: string]: components["schemas"]["ticker"] };
