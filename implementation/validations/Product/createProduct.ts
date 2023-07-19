import { z } from "zod";
import { IValidator } from "../../../src/validations/IValidator";

class CreateProduct implements IValidator {
  getSchema() {
    const createProductSchema = z.object({
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
        startTime: z.string().transform((str) => new Date(str)),
        endTime: z.string().transform((str) => new Date(str)),
      }),
    });

    return createProductSchema;
  }
}

export { CreateProduct };
