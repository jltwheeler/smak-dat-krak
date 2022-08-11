import { Trades } from "../../types";
import { isString } from "../guards";

export const getUniquePairs = (trades: Trades) =>
  Object.entries(trades).reduce((prev: string[], curr) => {
    const { pair } = curr[1];
    if (isString(pair)) {
      if (!prev.includes(pair)) return [...prev, pair];
    }
    return prev;
  }, []);
