import { createAPISignature } from "./index";

describe("createAPISignature", () => {
  it("correctly creates an API Signature", () => {
    const secret =
      "kQH5HW/8p1uGOVjbgWA7FunAmGO8lsSUXNsu3eow76sz84Q18fWxnyRzBHCd3pd5nE9qa99HAZtuZuj6F1huXg==";

    const reqParams = {
      nonce: "1616492376594",
      ordertype: "limit",
      pair: "XBTUSD",
      price: 37500,
      type: "buy",
      volume: 1.25,
    };
    const nonce = "1616492376594";
    const path = "/0/private/AddOrder";

    expect(createAPISignature({ path, secret, reqParams, nonce })).toBe(
      "4/dpxb3iT4tp/ZCVEwSnEsLxx0bqyhLpdfOpc6fn7OR8+UClSV5n9E6aSS8MPtnRfp32bAb0nmbRn6H8ndwLUQ=="
    );
  });
});
