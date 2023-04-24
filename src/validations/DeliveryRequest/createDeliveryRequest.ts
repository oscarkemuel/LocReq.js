import { z } from "zod";

export const createDeliveryRequestSchema = z.object({
  body: z.object({
    placeId: z.string({
      required_error: "PlaceId is required",
    }).uuid("Not a valid uuid"),
    productId: z.string({
      required_error: "ProductId is required",
    }).uuid("Not a valid uuid"),
    quantity: z.number({
      required_error: "Quantity is required",
    }).int("Quantity must be an integer")
  })
});