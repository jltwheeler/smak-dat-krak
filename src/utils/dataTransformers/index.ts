import { Trades, Trade } from "../../types";
import { isString } from "../guards";

export const composeUniquePairs = (trades: Trades) =>
  Object.entries(trades).reduce((prev: Record<string, Trade[]>, curr) => {
    const { pair } = curr[1];

    if (isString(pair)) {
      if (pair in prev) {
        return { ...prev, [pair]: [...prev[pair], curr[1]] };
      } else {
        return { ...prev, [pair]: [curr[1]] };
      }
    }
    return prev;
  }, {});
