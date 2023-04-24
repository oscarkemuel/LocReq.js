import { z } from "zod";

export const createSellerSchema = z.object({
  body: z.object({
    phone: z.string({
      required_error: "Phone is required",
    }).min(10, "Phone must have at least 10 characters")
      .max(10, "Phone must have at most 10 characters"),
    address: z.object({
      street: z.string({
        required_error: "Street is required",
      }),
      number: z.string({
        required_error: "Number is required",
      }),
      complement: z.string({
        required_error: "Complement is required",
      }),
      neighborhood: z.string({
        required_error: "Neighborhood is required",
      }),
      city: z.string({
        required_error: "City is required",
      }),
      state: z.string({
        required_error: "State is required",
      }).max(2, "State must have 2 characters"),
      zipCode: z.string({
        required_error: "ZipCode is required",
      }).min(8, "ZipCode must have 8 characters")
    })
  })
});