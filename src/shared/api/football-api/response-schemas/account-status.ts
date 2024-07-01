import { z } from 'zod';

const accountSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  email: z.string(),
});

const subscriptionSchema = z.object({
  plan: z.string(),
  end: z.string(),
  active: z.boolean(),
});

const requestsSchema = z.object({
  current: z.number(),
  limit_day: z.number(),
});

export const accountStatusResponseSchema = z.object({
  account: accountSchema,
  subscription: subscriptionSchema,
  requests: requestsSchema,
});

export type AccountStatusResponse = z.infer<typeof accountStatusResponseSchema>;

export const statusEndpointResponse = z.object({
  get: z.literal('status'),
  parameters: z.array(z.void()),
  errors: z.array(z.string()),
  results: z.number(),
  response: accountStatusResponseSchema,
});
