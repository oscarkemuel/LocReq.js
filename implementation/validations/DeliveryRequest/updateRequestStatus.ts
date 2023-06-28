import { z } from "zod";
import { IUpdateRequestStatus } from "../../../src/validations/DeliveryRequest/IUpdateRequestStatus";

class UpdateRequestStatus implements IUpdateRequestStatus {
  getSchema() {
    const updateRequestStatusSchema = z.object({
      body: z.object({
        status: z.enum(['pending', 'accepted', 'rejected', 'delivered']),
      }),
      params: z.object({
        deliveryRequestId: z.string({
          required_error: "DeliveryRequestId is required",
        }).uuid("Not a valid uuid"),
      }),
    });

    return updateRequestStatusSchema;
  }
}

export { UpdateRequestStatus }