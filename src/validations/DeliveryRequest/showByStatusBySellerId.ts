import { z } from "zod";

export const showByStatusBySellerIdSchema = z.object({
  params: z.object({
    status: z.enum(['pending', 'accepted', 'rejected', 'delivered', 'canceled']),
  }),
});