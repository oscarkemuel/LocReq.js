import { AnyZodObject } from "zod";

export interface IValidator {
  getSchema(): AnyZodObject;
}