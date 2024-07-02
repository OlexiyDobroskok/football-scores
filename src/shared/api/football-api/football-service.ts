import { logger } from '@shared/utils';

import 'server-only';

import {
  type AccountStatusResponse,
  statusEndpointResponse,
} from './response-schemas/account-status';
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
}

export const footballApiService = new FootballApiService(endpoints);
