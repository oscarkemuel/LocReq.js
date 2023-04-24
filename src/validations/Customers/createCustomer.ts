import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone is required",
    }).min(10, "Phone must have at least 10 characters")
      .max(10, "Phone must have at most 10 characters")
  })
});