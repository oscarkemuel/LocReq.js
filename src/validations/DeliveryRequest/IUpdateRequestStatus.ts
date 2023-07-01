import { AnyZodObject } from "zod";

export interface IUpdateRequestStatus {
  getSchema(): AnyZodObject;
}