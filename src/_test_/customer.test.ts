import { it, describe, expect } from "bun:test";
import type { Customer, UpdatePayload } from "../sdk/customer/schema";
import { Xendit } from "../sdk";

const xendit = Xendit(process.env.XENDIT_SK!);

describe("customer", () => {
  const reference_id = "test_1727530694258";
  const id = "cust-1ee0bfe4-d50a-46b6-ae50-1898a50a0312";

  const params: Customer = {
    reference_id: `test_${Date.now()}`,
    type: "INDIVIDUAL",
    individual_detail: {
      given_names: "John",
      surname: "Doe",
    },
    email: "new@customer.com",
    mobile_number: "+639118880000",
  };

  it("create", async () => {
    const response = await xendit.customer.create(params);
    expect(response.email).toEqual("new@customer.com");
  });

  it("update", async () => {
    const payload: UpdatePayload = {
      phone_number: "+639118881112",
    };
    const update = await xendit.customer.update({
      id,
      payload,
    });
    expect(update.phone_number).toEqual("+639118881112");
  });

  it("getById", async () => {
    const response = await xendit.customer.getById({ id });
    expect(response.reference_id).toEqual(reference_id);
  });

  it("getByRefId", async () => {
    const response = await xendit.customer.getByRefId({ reference_id });
    expect(response.data.length).toEqual(1);
  });
});
