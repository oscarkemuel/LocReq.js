import { z } from "zod";

export const updateDeliveryRequestStatusSchema = z.object({
  body: z.object({
    status: z.enum(['pending', 'accepted', 'rejected', 'delivered']),
  }),
  params: z.object({
    deliveryRequestId: z.string({
      required_error: "DeliveryRequestId is required",
    }).uuid("Not a valid uuid"),
  }),
});