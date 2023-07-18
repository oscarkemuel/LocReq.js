import { z } from "zod";
import { IValidator } from "../../../src/validations/IValidator";

class UpdateRequestStatus implements IValidator {
  getSchema() {
    const updateRequestStatusSchema = z.object({
      body: z.object({
        status: z.enum(['requested', 'confirmed', 'rented', 'returned', 'not-returned', 'rejected']),
      }),
      params: z.object({
        requestId: z.string({
          required_error: "requestId is required",
        }).uuid("Not a valid uuid"),
      }),
    });

    return updateRequestStatusSchema;
  }
}

export { UpdateRequestStatus }