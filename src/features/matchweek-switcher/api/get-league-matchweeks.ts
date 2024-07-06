import { footballApiService } from '@shared/api/football-api';

import 'server-only';

import { mapMatchweek } from '../lib/mapMatchweeks';
import { type Matchweek } from '../model/types';

export const getLeagueMatchweeks = async (params: {
  league: string;
  season: string;
}): Promise<Matchweek[] | null> => {
  const roundsDTO = await footballApiService.getLeagueRounds(params);

  if (!roundsDTO) {
    return null;
  }

  return roundsDTO.map((roundDTO) => mapMatchweek(roundDTO));
};

export const getCurrentMatchweek = async (params: {
  league: string;
  season: string;
}): Promise<Matchweek | null> => {
  const roundsDTO = await footballApiService.getLeagueRounds({
    ...params,
    current: 'true',
  });

  if (!roundsDTO) {
    return null;
  }

  const [matchweek] = roundsDTO.map((roundDTO) => mapMatchweek(roundDTO));

  return matchweek;
};
