import { z } from 'zod';

const pagingSchema = z.object({
  current: z.number(),
  total: z.number(),
});

export const apiErrorSchema = z.union([z.array(z.string()), z.object({})]);
export type APIError = z.infer<typeof apiErrorSchema>;

export const baseResponseSchema = z.object({
  get: z.string(),
  parameters: z.union([z.array(z.void()), z.object({})]),
  errors: apiErrorSchema,
  results: z.number(),
  paging: pagingSchema.optional(),
});
