import { z } from "zod";

export const createPlaceSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
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