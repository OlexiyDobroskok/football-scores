import { z } from 'zod';

const pagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

export const baseResponseSchema = z.object({
  get: z.string(),
  parameters: z.union([z.array(z.void()), z.object({})]),
  errors: z.array(z.string()),
  results: z.number(),
  paging: pagingSchema.optional(),
});
