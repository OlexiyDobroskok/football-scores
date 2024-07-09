import { logger } from '@shared/utils';

import 'server-only';

import {
  type AccountStatusResponse,
  statusEndpointResponse,
} from './response-schemas/account-status';
import {
  type FixtureDTO,
  type FixturesQueryParams,
  fixturesResponseSchema,
} from './response-schemas/fixtures';
import {
  type LeaguesDTO,
  type LeaguesQueryParams,
  leaguesResponseSchema,
} from './response-schemas/leagues';
import {
  type RoundDTO,
  type RoundQueryParams,
  roundsResponseSchema,
} from './response-schemas/rounds';
import {
  StandingsDTO,
  standingsResponseSchema,
} from './response-schemas/standings';
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

  async getLeagueRounds(
    queryParams?: RoundQueryParams,
  ): Promise<RoundDTO[] | null> {
    try {
      const rounds = await fetcher({
        endpoint: this.endpoints.ROUNDS,
        responseSchema: roundsResponseSchema,
        queryParams,
        options: {
          next: {
            revalidate: 86400,
          },
        },
      });
      return rounds.response;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async getFixtures(
    queryParams: FixturesQueryParams,
    options?: RequestInit,
  ): Promise<FixtureDTO[] | null> {
    try {
      const fixtures = await fetcher({
        endpoint: this.endpoints.FIXTURES,
        responseSchema: fixturesResponseSchema,
        queryParams,
        options,
      });
      return fixtures.response;
    } catch (error) {
      logger(error);
      return null;
    }
  }

  async getStandings(
    queryParams: FixturesQueryParams,
    options?: RequestInit,
  ): Promise<StandingsDTO | null> {
    try {
      const standings = await fetcher({
        endpoint: this.endpoints.STANDINGS,
        responseSchema: standingsResponseSchema,
        queryParams,
        options,
      });

      if (!standings.response.length) {
        return null;
      }

      const [standingsDTO] = standings.response;

      return standingsDTO;
    } catch (error) {
      logger(error);
      return null;
    }
  }
}

export const footballApiService = new FootballApiService(endpoints);
