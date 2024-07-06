import { z } from 'zod';

import { baseResponseSchema } from './base';

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

export type AccountRequests = z.infer<typeof requestsSchema>;

export const accountStatusResponseSchema = z.object({
  account: accountSchema,
  subscription: subscriptionSchema,
  requests: requestsSchema,
});

export type AccountStatusResponse = z.infer<typeof accountStatusResponseSchema>;

export const statusEndpointResponse = baseResponseSchema.extend({
  response: accountStatusResponseSchema,
});
