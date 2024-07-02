'use server';

import { logger } from '@shared/utils';

import { footballApiService } from '../football-service';
import { type AccountRequests } from '../response-schemas/account-status';

export const getFootballApiAccountStatus =
  async (): Promise<AccountRequests | null> => {
    try {
      const status = await footballApiService.getAccountStatus();
      if (!status) {
        return null;
      }

      return status.requests;
    } catch (error) {
      logger(error);
      return null;
    }
  };
