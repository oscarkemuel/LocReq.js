import { Request } from "express";
import { AnyZodObject, z } from "zod";

export async function validateSchema<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  return schema.parseAsync(req);
}