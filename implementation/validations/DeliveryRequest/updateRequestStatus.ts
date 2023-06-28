import { z } from "zod";
import { IUpdateRequestStatus } from "../../../src/validations/DeliveryRequest/IUpdateRequestStatus";

class UpdateRequestStatus implements IUpdateRequestStatus {
  getSchema() {
    const updateRequestStatusSchema = z.object({
      body: z.object({
        status: z.enum(['pending', 'accepted', 'rejected', 'delivered']),
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