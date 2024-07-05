import {
  footballApiService,
  type LeaguesQueryParams,
} from '@shared/api/football-api';

import 'server-only';

import { mapLeague } from '../lib/mappers';
import { League } from '../model/types';

export const getLeagueInformation = async ({
  id,
  season,
}: {
  id: string;
  season: string | null;
}): Promise<League | null> => {
  const seasonQuery: LeaguesQueryParams = season
    ? { season }
    : { current: 'true' };

  const leaguesDTO = await footballApiService.getLeagues({
    id,
    ...seasonQuery,
  });

  if (!leaguesDTO) {
    return null;
  }

  const [leagueDTO] = leaguesDTO;
  
  return mapLeague(leagueDTO);
};
