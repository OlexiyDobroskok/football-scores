import { footballApiService } from '@shared/api/football-api';

import 'server-only';

import { type Round } from '../model/types';

export const getRounds = async (params: {
  league: string;
  season: string;
}): Promise<Round[]> => {
  const rounds = await footballApiService.getLeagueRounds(params)
  
  return rounds ? rounds : [];
};

export const getCurrentRound = async (params: {
  league: string;
  season: string;
}): Promise<Round | null> => {
  const roundsDTO = await footballApiService.getLeagueRounds({
    ...params,
    current: 'true',
  });

  if (!roundsDTO) {
    return null;
  }

  const [round] = roundsDTO;

  return round;
};
