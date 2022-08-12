import { Trades, Trade } from "../../types";
import { isString } from "../guards";

type UniquePairs = Record<string, Trade[]>;

export const composeUniquePairs = (trades: Trades): UniquePairs =>
  Object.entries(trades).reduce<UniquePairs>((prev, curr) => {
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
