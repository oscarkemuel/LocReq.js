import { z } from "zod";

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    description: z.string({
      required_error: "Description is required",
    }),
    price: z.number({
      required_error: "Price is required",
    }),
    quantity: z.number({
      required_error: "Quantity is required",
    }).int("Quantity must be an integer")
  })
});