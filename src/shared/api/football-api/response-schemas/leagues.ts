import { z } from 'zod';

import { QueryParams } from '../config';

import { baseResponseSchema } from './base';

const leagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.union([z.literal('League'), z.literal('Cup')]),
  logo: z.string().url(),
});

const countrySchema = z.object({
  name: z.string(),
  code: z.string().nullable(),
  flag: z.string().url().nullable(),
});

const fixturesCoverageSchema = z.object({
  events: z.boolean(),
  lineups: z.boolean(),
  statistics_fixtures: z.boolean(),
  statistics_players: z.boolean(),
});

const coverageSchema = z.object({
  fixtures: fixturesCoverageSchema,
  standings: z.boolean(),
  players: z.boolean(),
  top_scorers: z.boolean(),
  top_assists: z.boolean(),
  top_cards: z.boolean(),
  injuries: z.boolean(),
  predictions: z.boolean(),
  odds: z.boolean(),
});

const seasonSchema = z.object({
  year: z.number(),
  start: z.string(),
  end: z.string(),
  current: z.boolean(),
  coverage: coverageSchema,
});

const leaguesDataSchema = z.object({
  league: leagueSchema,
  country: countrySchema,
  seasons: z.array(seasonSchema),
});

export type LeaguesDTO = z.infer<typeof leaguesDataSchema>;

export const leaguesResponseSchema = baseResponseSchema.extend({
  response: z.array(leaguesDataSchema),
});

export type LeaguesResponse = z.infer<typeof leaguesResponseSchema>;

export interface LeaguesQueryParams extends QueryParams {
  id?: string | number;
  name?: string;
  country?: string;
  code?: string;
  season?: string | number;
  team?: string | number;
  type?: 'league' | 'cup';
  current?: 'true' | 'false';
  search?: string;
  last?: string | number;
}
