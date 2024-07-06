import { z } from 'zod';

import { QueryParams } from '../config';

import { baseResponseSchema } from './base';

export const roundDataResponseSchema = z.string();

export type RoundDTO = z.infer<typeof roundDataResponseSchema>;

export const roundsResponseSchema = baseResponseSchema.extend({
  response: z.array(roundDataResponseSchema),
});

export interface RoundQueryParams extends QueryParams {
  league: string | number;
  season: string | number;
  current?: 'true' | 'false';
}
