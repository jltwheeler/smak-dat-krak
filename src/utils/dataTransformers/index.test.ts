import { composeUniquePairs } from "./index";

describe("getUniquePairs", () => {
  it("correctly returns the unique pairs", () => {
    const mockTrades = {
      "TXN-1": { type: "buy", price: "2", pair: "AVAXUSD" },
      "TXN-2": { type: "buy", price: "5", pair: "XETHZGBP" },
      "TXN-3": { type: "buy", price: "2", pair: "ZGBPZUSD" },
      "TXN-4": { type: "buy", price: "10", pair: "XETHZGBP" },
      "TXN-8": { type: "buy", price: "2", pair: "XXBTZGBP" },
      "TXN-9": { type: "buy", price: "2", pair: "XETHZGBP" },
      "TXN-10": { type: "buy", price: "2", pair: "DOTGBP" },
      "TXN-11": { type: "buy", price: "2", pair: "SOLGBP" },
      "TXN-12": { type: "buy", price: "4", pair: "XETHZGBP" },
      "TXN-13": { type: "buy", price: "4", pair: "AVAXUSD" },
    };

    expect(composeUniquePairs(mockTrades)).toEqual({
      AVAXUSD: [
        { type: "buy", price: "2", pair: "AVAXUSD" },
        { type: "buy", price: "4", pair: "AVAXUSD" },
      ],
      XETHZGBP: [
        { type: "buy", price: "5", pair: "XETHZGBP" },
        { type: "buy", price: "10", pair: "XETHZGBP" },
        { type: "buy", price: "2", pair: "XETHZGBP" },
        { type: "buy", price: "4", pair: "XETHZGBP" },
      ],
      SOLGBP: [{ pair: "SOLGBP", price: "2", type: "buy" }],
      DOTGBP: [{ pair: "DOTGBP", price: "2", type: "buy" }],
      ZGBPZUSD: [{ pair: "ZGBPZUSD", price: "2", type: "buy" }],
      XXBTZGBP: [{ type: "buy", price: "2", pair: "XXBTZGBP" }],
    });
  });
});
