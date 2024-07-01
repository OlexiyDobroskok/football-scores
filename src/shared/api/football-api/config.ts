import { z } from 'zod';

import { serverEnv } from '@shared/config/env/server';
import { InvalidResponseDataException } from '@shared/config/exceptions';

export const baseUrl = 'https://v3.football.api-sports.io';

export const accessHeaders = new Headers();
accessHeaders.append('x-rapidapi-host', 'v3.football.api-sports.io');
accessHeaders.append('x-rapidapi-key', serverEnv.FOOTBALL_API_KEY);

export const endpoints = {
  STATUS: '/status',
} as const;

export type FootballApiEndpoints = typeof endpoints;
export type FootballApiEndpoint = (typeof endpoints)[keyof typeof endpoints];

interface FetchArguments<ZT extends z.ZodType> {
  endpoint: FootballApiEndpoint;
  responseSchema: ZT;
  options?: RequestInit;
}

const createURL = (endpoint: FootballApiEndpoint): string =>
  `${baseUrl}${endpoint}`;

export const fetcher = async <ZT extends z.ZodType>({
  endpoint,
  responseSchema,
  options,
}: FetchArguments<ZT>): Promise<ZT['_output']> => {
  const url = createURL(endpoint);
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
