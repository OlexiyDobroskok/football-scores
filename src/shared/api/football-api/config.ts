import { z } from 'zod';

import { serverEnv } from '@shared/config/env/server';
import { InvalidResponseDataException } from '@shared/config/exceptions';

export const baseUrl = 'https://v3.football.api-sports.io';

export const accessHeaders = new Headers();
accessHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');
accessHeaders.append('x-rapidapi-key', serverEnv.FOOTBALL_API_KEY);

export const endpoints = {
  STATUS: '/status',
  LEAGUES: '/leagues',
  ROUNDS: '/fixtures/rounds',
  FIXTURES: '/fixtures',
  STANDINGS: '/standings',
} as const;

export type FootballApiEndpoints = typeof endpoints;
export type FootballApiEndpoint = (typeof endpoints)[keyof typeof endpoints];

export type QueryParams = Record<string, string | number | undefined>;

interface FetchArguments<ZT extends z.ZodType> {
  endpoint: FootballApiEndpoint;
  responseSchema: ZT;
  queryParams?: QueryParams;
  options?: RequestInit;
}

const createQueries = (queryParams: QueryParams): string => {
  let queries = '';

  for (const [key, value] of Object.entries(queryParams)) {
    if (queries.length === 0) {
      queries = `?${key}=${value}`;
      continue;
    }

    queries += `&${key}=${value}`;
  }

  return queries;
};

const createURL = (
  endpoint: FootballApiEndpoint,
  queryParams?: QueryParams,
): string =>
  queryParams
    ? `${baseUrl}${endpoint}${createQueries(queryParams)}`
    : `${baseUrl}${endpoint}`;

export const fetcher = async <ZT extends z.ZodType>({
  endpoint,
  queryParams,
  responseSchema,
  options,
}: FetchArguments<ZT>): Promise<ZT['_output']> => {
  const url = createURL(endpoint, queryParams);
  const response = await fetch(url, {
    headers: accessHeaders,
    ...options,
  });

  if (!response.ok) {
    const errorMessage = `Fetch to ${endpoint} failed with ${response.status} status`;
    throw new Error(errorMessage);
  }
  const data = (await response.json()) as unknown;
  const parsedData = responseSchema.safeParse(data);

  if (!parsedData.success) {
    const errorMessage = `Invalid data from ${endpoint}`;
    throw new InvalidResponseDataException(errorMessage);
  }

  return parsedData.data;
};
