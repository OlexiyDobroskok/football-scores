import { z } from 'zod';

import { type QueryParams } from '../config';

import { baseResponseSchema } from './base';

const MatchShortStatusEnum = z.enum([
  'TBD',
  'NS',
  '1H',
  'HT',
  '2H',
  'ET',
  'P',
  'FT',
  'AET',
  'PEN',
  'BT',
  'SUSP',
  'INT',
  'PST',
  'CANC',
  'ABD',
  'AWD',
  'WO',
  'LIVE',
]);

const periodsSchema = z.object({
  first: z.number().nullable(),
  second: z.number().nullable(),
});

const venueSchema = z.object({
  id: z.number().nullable(),
  name: z.string().nullable(),
  city: z.string().nullable(),
});

const statusSchema = z.object({
  long: z.string(),
  short: MatchShortStatusEnum,
  elapsed: z.number().nullable(),
});

const fixtureSchema = z.object({
  id: z.number(),
  referee: z.string().nullable(),
  timezone: z.string(),
  date: z.string(),
  timestamp: z.number(),
  periods: periodsSchema,
  venue: venueSchema,
  status: statusSchema,
});

const leagueSchema = z.object({
  id: z.number(),
  name: z.string(),
  country: z.string(),
  logo: z.string().url(),
  flag: z.string().url().nullable(),
  season: z.number(),
  round: z.string(),
});

const teamSchema = z.object({
  id: z.number(),
  name: z.string(),
  logo: z.string().url(),
  winner: z.boolean().nullable(),
});

const teamsSchema = z.object({
  home: teamSchema,
  away: teamSchema,
});

const goalsSchema = z.object({
  home: z.number().nullable(),
  away: z.number().nullable(),
});

const scoreSchema = z.object({
  halftime: goalsSchema,
  fulltime: goalsSchema,
  extratime: goalsSchema.nullable(),
  penalty: goalsSchema.nullable(),
});

const fixtureDataResponseSchema = z.object({
  fixture: fixtureSchema,
  league: leagueSchema,
  teams: teamsSchema,
  goals: goalsSchema,
  score: scoreSchema,
});

export type FixtureDTO = z.infer<typeof fixtureDataResponseSchema>;

export const fixturesResponseSchema = baseResponseSchema.extend({
  response: z.array(fixtureDataResponseSchema),
});

export type FixturesResponse = z.infer<typeof fixturesResponseSchema>;

export interface FixturesQueryParams extends QueryParams {
  id?: string | number;
  ids?: string;
  live?: 'all' | string;
  date?: string;
  league?: string | number;
  season?: string | number;
  team?: string | number;
  last?: string | number;
  next?: string | number;
  from?: string;
  to?: string;
  round?: string;
  status?: string;
  venue?: string | number;
  timezone?: string;
}
