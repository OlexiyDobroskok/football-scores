import { logger } from '@shared/utils';

import 'server-only';

import {
  type AccountStatusResponse,
  statusEndpointResponse,
} from './response-schemas/account-status';
import {
  type LeaguesDTO,
  type LeaguesQueryParams,
  leaguesResponseSchema,
} from './response-schemas/leagues';
import { endpoints, fetcher, type FootballApiEndpoints } from './config';

export class FootballApiService {
  constructor(private endpoints: FootballApiEndpoints) {}

  async getAccountStatus(): Promise<AccountStatusResponse | null> {
    try {
      const status = await fetcher({
        endpoint: this.endpoints.STATUS,
        responseSchema: statusEndpointResponse,
        options: {
          next: {
            revalidate: 30,
          },
        },
      });

      return status.response;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async getLeagues(
    queryParams?: LeaguesQueryParams,
  ): Promise<LeaguesDTO[] | null> {
    try {
      const leagues = await fetcher({
        endpoint: this.endpoints.LEAGUES,
        responseSchema: leaguesResponseSchema,
        queryParams,
        options: {
          next: {
            revalidate: 86400,
          },
        },
      });

      return leagues.response;
    } catch (error) {
      logger(error);
      return null;
    }
  }
}

export const footballApiService = new FootballApiService(endpoints);
