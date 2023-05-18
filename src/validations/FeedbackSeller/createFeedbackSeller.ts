import { z } from "zod";

export const createFeedbackSeller = z.object({
  body: z.object({
    sellerId: z.string().uuid(),
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1).max(255).optional()
  })
});