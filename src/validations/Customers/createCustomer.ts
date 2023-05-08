import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone is required",
    }).min(11, "Phone must have at least 10 characters")
      .max(11, "Phone must have at most 10 characters")
  })
});