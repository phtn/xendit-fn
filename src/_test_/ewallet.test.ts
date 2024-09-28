import { it, describe, expect } from "bun:test";
import { Xendit } from "../sdk";
import type { EWalletChargeParams } from "../sdk/ewallet/schema";

const xendit = Xendit(process.env.XENDIT_SK!);

describe("ewallet", () => {
  let newId = "";
  const params: EWalletChargeParams = {
    reference_id: `TEST_REF_ID_${Date.now()}`,
    currency: "PHP",
    amount: 50000,
    checkout_method: "ONE_TIME_PAYMENT",
    channel_code: "PH_GCASH",
    channel_properties: {
      success_redirect_url: "https://re-up.ph",
      failure_redirect_url: "https://re-up.ph",
    },
  };
  it("charge", async () => {
    const response = await xendit.ewallet.charge(params);
    newId = response.id;
    expect(typeof response).not.toBe(undefined);
  });

  it("get", async () => {
    const id = "ewc_103264c8-680f-41e4-a73b-3fca85e5677c";
    const response = await xendit.ewallet.get({ id: newId });
    console.log(response);
    expect(response.charge_amount).toEqual(50000);
  });
});
