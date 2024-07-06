import { type RoundDTO } from '@shared/api/football-api';

import { type Matchweek } from '../model/types';

export const mapMatchweek = (round: RoundDTO): Matchweek => {
  const matchweekNumber = round.split(' ').at(-1);

  return matchweekNumber ? +matchweekNumber : 1;
};
