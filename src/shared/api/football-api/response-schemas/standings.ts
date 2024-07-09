import { z } from 'zod';

import { type QueryParams } from '../config';

import { baseResponseSchema } from './base';

const goalsSchema = z.object({
  for: z.number(),
  against: z.number(),
});

const matchPlaceRecordSchema = z.object({
  played: z.number().nullable(),
  win: z.number().nullable(),
  draw: z.number().nullable(),
  lose: z.number().nullable(),
  goals: z.object({
    for: z.number().nullable(),
    against: z.number().nullable(),
  }),
});

const recordSchema = z.object({
  played: z.number(),
  win: z.number(),
  draw: z.number(),
  lose: z.number(),
  goals: goalsSchema,
});

const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
});

const standingSchema = z.object({
  rank: z.number(),
  team: teamSchema,
  points: z.number(),
  goalsDiff: z.number(),
  group: z.string(),
  form: z.string().nullable(),
  status: z.string(),
  description: z.string().nullable(),
  all: recordSchema,
  home: matchPlaceRecordSchema,
  away: matchPlaceRecordSchema,
  update: z.string(),
});

const leagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  season: z.number(),
  standings: z.array(z.array(standingSchema)),
});

const standingsDataResponseSchema = z.object({
  league: leagueSchema,
});

export type StandingsDTO = z.infer<typeof standingsDataResponseSchema>;

export const standingsResponseSchema = baseResponseSchema.extend({
  response: z.array(standingsDataResponseSchema),
});

export interface StandingsQueryParams extends QueryParams {
  league?: string | number;
  season: string | number;
  team?: string | number;
}
