import { getUniquePairs } from "./index";

describe("getUniquePairs", () => {
  it("correctly returns the unique pairs", () => {
    const mockTrades = {
      "TXN-1": { pair: "AVAXUSD" },
      "TXN-2": { pair: "XETHZGBP" },
      "TXN-3": { pair: "ZGBPZUSD" },
      "TXN-4": { pair: "XETHZGBP" },
      "TXN-5": { pair: "XXBTZGBP" },
      "TXN-6": { pair: "XXBTZGBP" },
      "TXN-7": { pair: "XXBTZGBP" },
      "TXN-8": { pair: "XXBTZGBP" },
      "TXN-9": { pair: "XETHZGBP" },
      "TXN-10": { pair: "DOTGBP" },
      "TXN-11": { pair: "SOLGBP" },
      "TXN-12": { pair: "XETHZGBP" },
      "TXN-13": { pair: "AVAXUSD" },
    };

    expect(getUniquePairs(mockTrades)).toEqual([
      "AVAXUSD",
      "XETHZGBP",
      "ZGBPZUSD",
      "XXBTZGBP",
      "DOTGBP",
      "SOLGBP",
    ]);
  });
});
