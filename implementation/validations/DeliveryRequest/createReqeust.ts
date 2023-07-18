import { z } from "zod";
import { IValidator } from "../../../src/validations/IValidator";

class CreateRequest implements IValidator {
  getSchema() {
    const updateRequestStatusSchema = z.object({
      body: z.object({
        placeId: z.string({
          required_error: "PlaceId is required",
        }).uuid("Not a valid uuid"),
        productId: z.string({
          required_error: "ProductId is required",
        }).uuid("Not a valid uuid"),
        days: z.number({
          required_error: "Days is required",
        })
      })
    });

    return updateRequestStatusSchema;
  }
}

export { CreateRequest }