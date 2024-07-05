import { footballApiService } from '@shared/api/football-api';

import 'server-only';

import { mapLeague } from '../lib/mappers';
import { League } from '../model/types';

export const getLeagueInformation = async (
  id: string,
): Promise<League | null> => {
  const leaguesDTO = await footballApiService.getLeagues({
    id,
  });

  if (!leaguesDTO) {
    return null;
  }

  const [leagueDTO] = leaguesDTO;

  return mapLeague(leagueDTO);
};
